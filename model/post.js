const flatMap = require('flatmap')

const { query, transaction, queryWithConnection } = require('../db')

const responses = require('../responses')

const pollModel = require('./poll')
const imageModel = require('./image')

const postModel = module.exports = {
    doesPostExists: postId => new Promise(async (resolve, reject) => {
        try {
            const posts = await query(`SELECT * FROM post WHERE id = ?`, [postId])

            resolve(posts.length > 0)
        } catch (error) {
            reject(error)
        }
    }),

    getPostsByGroupId: groupId => new Promise(async (resolve, reject) => {
        const posts = await query('SELECT * FROM post WHERE groupId = ?', [groupId])
        const fullPosts = await Promise.all(posts.map(async postPromise => {
            const post = await postPromise
            const poll = post.pollId ? await pollModel.getOptionsForPoll(post.pollId) : null
            const image = post.imageId ? await imageModel.getImageById(post.imageId) : null
            const likes = await postModel.getLikesForPost(post.id)
            const comments = await postModel.getCommentsForPost(post.id)

            return {
                id: post.id,
                content: post.content,
                creationDate: post.creationDate,
                poll: poll,
                image: image,
                likes: likes,
                comments: comments
            }
        }))

        resolve(fullPosts)
    }),

    getPostById: postId => new Promise(async (resolve, reject) => {
        try {
            const posts = await query(`SELECT *
                                       FROM post
                                       WHERE id = ?`, [postId])

            if (posts.length === 0) return reject(responses.notFound())

            const post = posts[0]
            const poll = post.pollId ? await pollModel.getOptionsForPoll(post.pollId) : null
            const image = post.imageId ? await imageModel.getImageById(post.imageId) : null
            const likes = await postModel.getLikesForPost(postId)
            const comments = await postModel.getCommentsForPost(postId)

            const fullPost = {
                id: post.id,
                content: post.content,
                creationDate: post.creationDate,
                poll: poll,
                image: image,
                likes: likes,
                comments: comments
            }

            resolve(fullPost)
        } catch (error) {
            reject(error)
        }
    }),

    userHasPerMissionToViewPost: (userId, postId) => new Promise(async (resolve, reject) => {
        try {

            const users = await query(`SELECT usersInGroup.id
                         FROM usersInGroup
                         JOIN post ON post.groupId = usersInGroup.groupId
                         WHERE post.id = ? AND userId = ?`, [postId, userId])

            resolve(users.length > 0)

        } catch (error) {
            reject(error)
        }
    }),

    doesUserLikePost: (postId, userId) => new Promise(async (resolve, reject) => {
        try {
            const likes = await query(`SELECT id FROM \`like\` WHERE postId = ? AND userId = ?`, [postId, userId])

            resolve(likes.length > 0)
        } catch (error) {
            reject(error)
        }
    }),

    like: (postId, userId) => new Promise(async (resolve, reject) => {
        try {

            const userLikesPost = await postModel.doesUserLikePost(postId, userId)

            if (userLikesPost) {
                await query(`DELETE FROM \`like\` WHERE postId = ? AND userId = ?`, [postId, userId])
            } else {
                await query(`INSERT INTO \`like\` (postId, userId) VALUES (?, ?)`, [postId, userId])
            }

            resolve(!userLikesPost)

        } catch (error) {
            reject(error)
        }
    }),

    comment: (postId, userId, comment) => new Promise(async (resolve, reject) => {
        try {
            await query(`INSERT INTO comment (content, postId, userId) VALUES (?, ?, ?)`, [comment, postId, userId])

            resolve()
        } catch (error) {
            reject(error)
        }
    }),

    getLikesForPost: postId => query(`SELECT * FROM \`like\` WHERE postId = ?`, [postId]),

    getCommentsForPost: postId => query(`SELECT * FROM comment WHERE postId = ?`, [postId]),

    createPost: (groupId, userId, post) => new Promise((resolve, reject) => {
        try {

            transaction(async connection => {
                try {

                    let pollId = null
                    let imageId = null

                    if (typeof post.poll !== "undefined" && post.poll) {
                        await queryWithConnection(connection, `INSERT INTO poll (question)
                                                               VALUES (?)`, [post.poll.question])
                        pollId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id`))[0]['id']

                        const answersString = post.poll.answers.map(() => '(?, ?)').join(',')
                        const params = flatMap(post.poll.answers, answer => [pollId, answer])

                        await queryWithConnection(connection, `INSERT INTO pollOption (pollId, answer)
                                                               VALUES ${answersString}`, params)

                    }

                    if (typeof post.image !== "undefined" && post.image) {
                        await queryWithConnection(connection, `INSERT INTO image (path) VALUES (?)`, [post.image])
                        imageId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id`))[0]['id']
                    }

                    await queryWithConnection(connection, `INSERT INTO post (groupId, content, imageId, pollId, creator)
                                                           VALUES (?, ?, ?, ?, ?)`,
                        [groupId, post.content, imageId, pollId, userId])

                    const postId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id`))[0]['id']

                    connection.commit()

                    resolve(postId)

                } catch (error) {
                    connection.rollback()
                    reject(error)
                }

            })

        } catch (error) {
            reject(error)
        }
    }),

    vote: (postId, userId, option) => new Promise(async (resolve, reject) => {
        try {

            if (!(await postModel.doesPostExists(postId)))
                return reject(responses.notFound())

            const pollIds = await query(`SELECT pollId FROM post WHERE id = ?`, [postId])

            if (pollIds.length === 0) return reject(responses.notFound())

            const pollId = pollIds[0]

            await query(`DELETE FROM vote WHERE pollId = ? AND voter = ?`, [pollId, userId])

            await query(`INSERT INTO vote (pollId, voter, selectedOption) VALUES (?, ?, ?)`, [pollId, userId, option])

            resolve()

        } catch (error) {
            reject(error)
        }
    }),

    hasUserPermissionToPost: (userId, postId) => new Promise(async (resolve, reject) => {
        try {

            const posts = await query(`SELECT id FROM post WHERE creator = ? AND id = ?`,
                [userId, postId])

            resolve(posts.length > 0)

        } catch (error) {
            reject(error)
        }
    }),

    editPost: (postId, post, oldPost, userId) => new Promise((resolve, reject) => {
        transaction(async connection => {
            try {

                let pollId = null
                let imageId = null

                if (typeof post.poll !== "undefined" && post.poll) {
                    await queryWithConnection(connection, `INSERT INTO poll (question)
                                                               VALUES (?)`, [post.poll.question])
                    pollId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id`))[0]['id']

                    const answersString = post.poll.answers.map(() => '(?, ?)').join(',')
                    const params = flatMap(post.poll.answers, answer => [pollId, answer])

                    await queryWithConnection(connection, `INSERT INTO pollOption (pollId, answer)
                                                               VALUES ${answersString}`, params)

                }

                if (typeof oldPost.poll !== "undefined" && oldPost.poll) {
                    await query(`UPDATE vote SET pollId = ? WHERE pollId = ?`,
                        [oldPost.poll.id, pollId])

                    await query(`DELETE FROM poll WHERE id = ?`, [oldPost.poll.id])
                }

                if (typeof post.image !== "undefined" && post.image) {
                    await queryWithConnection(connection, `INSERT INTO image (path) VALUES (?)`, [post.image])
                    imageId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id`))[0]['id']
                }

                await queryWithConnection(connection, `INSERT INTO post (groupId, content, imageId, pollId, creator)
                                                           VALUES (?, ?, ?, ?, ?)`,
                    [oldPost.groupId, post.content, imageId, pollId, userId])

                const postId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id`))[0]['id']

                await queryWithConnection(connection, `DELETE FROM post WHERE id = ?`,
                    [oldPost.id])

                connection.commit()

                resolve(postId)

            } catch (error) {
                connection.rollback()
                reject (error)
            }
        })
    })
}