const { query } = require('../db')

const responses = require('../responses')

const poll = require('./poll')
const image = require('./image')

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
            const poll = post.pollId ? await poll.getOptionsForPoll(post.pollId) : null
            const image = post.imageId ? await image.getImageById(post.imageId) : null
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
            const poll = post.pollId ? await poll.getOptionsForPoll(post.pollId) : null
            const image = post.imageId ? await image.getImageById(post.imageId) : null
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
}