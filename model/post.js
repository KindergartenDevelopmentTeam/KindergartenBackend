const { query } = require('../db')

const responses = require('../responses')

const poll = require('./poll')
const image = require('./image')

module.exports = {
    getPostsByGroupId: groupId => new Promise(async (resolve, reject) => {
        const posts = await query('SELECT * FROM post WHERE groupId = ?', [groupId])
        const fullPosts = await Promise.all(posts.map(async postPromise => {
            const post = await postPromise
            const poll = post.pollId ? await poll.getOptionsForPoll(post.pollId) : null
            const image = post.imageId ? await image.getImageById(post.imageId) : null

            return {
                ...post,
                poll: poll,
                image: image
            }
        }))

        resolve(fullPosts)
    }),

    getPostById: postId => new Promise(async (resolve, reject) => {
        const posts = await query(`SELECT * FROM post WHERE id = ?`, [postId])

        if (posts.length === 0) return reject(responses.notFound())

        const post = posts[0]
        const poll = post.pollId ? await poll.getOptionsForPoll(post.pollId) : null
        const image = post.imageId ? await image.getImageById(post.imageId) : null

        const fullPost = {
            ...post,
            poll,
            image
        }

        resolve(fullPost)
    })
}