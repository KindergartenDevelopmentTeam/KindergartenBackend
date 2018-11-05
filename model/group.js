const { query } = require('../db')
const writer = require('../utils/writer')
const responses = require('../responses')
const { roles } = require('../constants')

const message = require('./message')
const post = require('./post')
const user = require('./user')

module.exports = {
    getGroupById: groupId => new Promise(async (resolve, reject) => {
        const groups = await query('SELECT * FROM `group` WHERE id = ?', [groupId])
        if (groups.length === 0) return reject(responses.notFound())

        const group = groups[0]

        const fullGroup = {
            ...group,
            messages: await message.getMessages(group.threadId),
            posts: await post.getPostsByGroupId(group.id),
            teachers: await user.getUsersInGroupByRole(group.id, roles.teacher),
            parents: await user.getUsersInGroupByRole(group.id, roles.parent)
        }

        resolve(fullGroup)
    }),

    addTeacher: (groupId, teacherId) => new Promise(async (resolve, reject) => {

    })
}
