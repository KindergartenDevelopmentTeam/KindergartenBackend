const flatMap = require('flatmap')

const { query, transaction, queryWithConnection } = require('../db')

const responses = require('../responses')

const pollModel = require('./poll')
const imageModel = require('./image')
const pathModel = require('./path')

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
            const path = post.pathId ? await pathModel.getPathById(post.pathId) : null
            const likes = await postModel.getLikesForPost(post.id)
            const comments = await postModel.getCommentsForPost(post.id)

            return {
                id: post.id,
                content: post.content,
                creationDate: post.creationDate,
                poll: poll,
                image: image,
                path: path,
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
            const path = post.pathId ? await pathModel.getPathById(post.pathId) : null
            const likes = await postModel.getLikesForPost(postId)
            const comments = await postModel.getCommentsForPost(postId)

            const fullPost = {
                id: post.id,
                groupId: post.groupId,
                content: post.content,
                creationDate: post.creationDate,
                poll: poll,
                image: image,
                path: path,
                likes: likes,
                comments: comments
            }

            resolve(fullPost)
        } catch (error) {
            reject(error)
        }
    }),

    userHasPerMissionToViewPost: (postId, userId) => new Promise(async (resolve, reject) => {
        try {

            console.log(`userId: ${userId}, postId: ${postId}`)

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

                    if (typeof post.image !== "undefined" && post.image !== null) {
                        await queryWithConnection(connection, `INSERT INTO image (path) VALUES (?)`, [post.image])
                        imageId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id`))[0]['id']
                    }

                    let pathId = null
                    if (post.hasOwnProperty('path') && post.path !== null && post.path.length > 0) {
                        await queryWithConnection(connection, `INSERT INTO path () VALUES ()`, [])
                        pathId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id`))[0]['id']

                        const insertStr = post.path.map(pathElement => `(?, ?, ?)`).join(',')
                        const insertValues = flatMap(post.path, pathElement => [pathId, pathElement.x, pathElement.y])

                        await queryWithConnection(connection, `INSERT INTO pathElements (pathId, x, y)
                                                               VALUES ${insertStr}`, insertValues)
                    }

                    await queryWithConnection(connection, `INSERT INTO post (groupId, content, imageId, pollId, pathId, creator)
                                                           VALUES (?, ?, ?, ?, ?, ?)`,
                        [groupId, post.content, imageId, pollId, pathId, userId])

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

            console.log(`pollids: ${JSON.stringify(pollIds)}`)

            if (pollIds.length === 0) return reject(responses.notFound())

            const pollId = pollIds[0]['pollId']

            if (pollId === null) return reject(responses.notFound())

            console.log(`pollId: ${JSON.stringify(pollId)}`)

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

            console.log(`user: ${userId}, post: ${postId} result: ${JSON.stringify(posts)}`)

            resolve(posts.length > 0)

        } catch (error) {
            reject(error)
        }
    }),

    editPost: (postId, post, oldPost, userId) => new Promise((resolve, reject) => {
        transaction(async connection => {
            try {

                console.log(`oldPost: ${JSON.stringify(oldPost)}`)

                if (post.poll !== oldPost.poll) {
                    if (!post.hasOwnProperty('poll') || post.poll === null) {
                        const pollId = (await queryWithConnection(connection,
                            `SELECT pollId FROM post WHERE id = ?`, [postId]))[0]['pollId']
                        await queryWithConnection(connection, `UPDATE post SET pollId = NULL WHERE id = ?`, [postId])
                        await queryWithConnection(connection, `DELETE FROM pollOption WHERE pollId = ?`, [pollId])
                        await queryWithConnection(connection, `DELETE FROM vote WHERE pollId = ?`, [pollId])
                        await queryWithConnection(connection, `DELETE FROM poll WHERE id = ?`, [pollId])
                    } else if (typeof oldPost.poll !== "undefined" && oldPost.poll !== null) {
                        await queryWithConnection(connection, `UPDATE poll
                                                               SET question = ?
                                                               WHERE id = ?`,
                            [post.poll.question, post.poll.id])

                        console.log(`oldPost: ${JSON.stringify(oldPost)}`)


                        await queryWithConnection(connection, `DELETE FROM vote WHERE pollId = ?`, [oldPost.poll.id])
                        await queryWithConnection(connection, `DELETE FROM pollOption WHERE pollId = ?`, [oldPost.poll.id])
                        await queryWithConnection(connection, `DELETE FROM poll WHERE id = ?`, [oldPost.poll.id])

                        await queryWithConnection(connection, `INSERT INTO poll (question) VALUES (?)`,
                            [post.poll.question])
                        const pollId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id`))[0]['id']

                        const answersString = post.poll.answers.map(() => '(?, ?)').join(',')
                        const params = flatMap(post.poll.answers, answer => [pollId, answer])

                        await queryWithConnection(connection, `INSERT INTO pollOption (pollId, answer)
                                                               VALUES ${answersString}`, params)

                        await queryWithConnection(connection, `UPDATE post SET pollId = ? WHERE id = ?`,
                            [pollId, postId])

                    } else {

                        await queryWithConnection(connection, `INSERT INTO poll (question) VALUES (?)`,
                            [post.poll.question])
                        const pollId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id`))[0]['id']

                        const answersString = post.poll.answers.map(() => '(?, ?)').join(',')
                        const params = flatMap(post.poll.answers, answer => [pollId, answer])

                        await queryWithConnection(connection, `INSERT INTO pollOption (pollId, answer)
                                                               VALUES ${answersString}`, params)

                        await queryWithConnection(connection, `UPDATE post SET pollId = ? WHERE id = ?`,
                            [pollId, postId])

                    }
                }

                console.log(`oldPost:\n${JSON.stringify(oldPost, null, 2)}\n post:\n${JSON.stringify(post, null, 2)}`)

                if (oldPost.image !== post.image) {
                    if (!post.hasOwnProperty('image') || post.image === null) {

                        const imageId = (await queryWithConnection(connection,
                                `SELECT imageId FROM post WHERE id = ?`, [postId]))[0]['imageId']
                        await queryWithConnection(connection, `UPDATE post SET imageId = NULL WHERE id = ?`, [postId])
                        await queryWithConnection(connection, `DELETE FROM image WHERE id = ?`, [imageId])

                    } else if (typeof oldPost.image !== "undefined" && oldPost.image !== null) {

                        await queryWithConnection(connection, `UPDATE image SET path = ?
                                                               WHERE id = (SELECT imageId FROM post WHERE id = ?)`,
                            [post.image, postId])

                    } else {
                        await queryWithConnection(connection, `INSERT INTO image (path) VALUES (?)`, [post.image])
                        const imageId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id`))[0]['id']
                        await queryWithConnection(connection, `UPDATE post SET imageId = ? WHERE id = ?`,
                            [imageId, postId])
                    }
                }


                if (post.path !== oldPost.path) {
                    if (!post.hasOwnProperty('path') || post.path === null || post.path.length === 0) {
                        const pathId = (await queryWithConnection(connection,
                            `SELECT pathId FROM post WHERE id = ?`, [postId]))[0]['pathId']
                        await queryWithConnection(connection, `UPDATE post SET pathId = NULL WHERE id = ?`, [postId])
                        await queryWithConnection(connection, `DELETE FROM pathElements WHERE pathId = ?`, [pathId])
                        await queryWithConnection(connection, `DELETE FROM path WHERE id = ?`, [pathId])
                    } else if (typeof oldPost.path !== "undefined" && oldPost.path !== null && oldPost.path.length > 0) {

                        const oldPathId = (await queryWithConnection(connection,
                            `SELECT pathId FROM post WHERE id = ?`, [postId]))[0]['pathId']

                        await queryWithConnection(connection, `DELETE FROM pathElements WHERE pathId = ?`, [oldPathId])
                        await queryWithConnection(connection, `DELETE FROM path WHERE id = ?`, [oldPathId])

                        await queryWithConnection(connection, `INSERT INTO path () VALUES ()`, [])
                        const pathId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id`))[0]['id']

                        const answersString = post.path.map(() => '(?, ?, ?)').join(',')
                        const params = flatMap(post.path, path => [pathId, path.x, path.y])

                        await queryWithConnection(connection, `INSERT INTO pathElements (pathId, x, y)
                                                               VALUES ${answersString}`, params)

                        await queryWithConnection(connection, `UPDATE post SET pathId = ? WHERE id = ?`,
                            [pathId, postId])

                    } else {

                        await queryWithConnection(connection, `INSERT INTO path () VALUES ()`, [])
                        const pathId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id`))[0]['id']

                        const answersString = post.path.map(() => '(?, ?, ?)').join(',')
                        const params = flatMap(post.path, path => [pathId, path.x, path.y])

                        await queryWithConnection(connection, `INSERT INTO pathElements (pollId, answer)
                                                               VALUES ${answersString}`, params)

                        await queryWithConnection(connection, `UPDATE post SET pathId = ? WHERE id = ?`,
                            [pathId, postId])

                    }
                }


                let pathId = null
                if (post.hasOwnProperty('path') && post.path !== null && post.path.length > 0) {
                    await queryWithConnection(connection, `INSERT INTO path () VALUES ()`, [])
                    pathId = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id`))[0]['id']

                    const insertStr = path.map(pathElement => `(?, ?, ?)`)
                    const insertValues = flatMap(post.path, pathElement => [pathId, pathElement.x, pathElement.y])

                    await queryWithConnection(connection, `INSERT INTO pathElements (pathId, x, y)
                                                               VALUES ${insertStr}`, insertValues)
                }

                await queryWithConnection(connection, `UPDATE post SET content = ? WHERE id = ?`, [post.content, postId])

                connection.commit()

                resolve()

            } catch (error) {
                connection.rollback()
                reject (error)
            }
        })
    })
}