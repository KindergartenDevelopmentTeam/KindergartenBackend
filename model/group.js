const { query } = require('../db')
const writer = require('../utils/writer')
const responses = require('../responses')
const { roles } = require('../constants')

const message = require('./message')
const post = require('./post')
const user = require('./user')

const group = module.exports = {
    doesGroupExists: groupId => new Promise(async (resolve, reject) => {
        try {
            const groups = await query(`SELECT *
                                        FROM \`group\`
                                        WHERE id = ?`, [groupId])

            resolve(groups.length > 0)
        } catch (error) {
            reject(error)
        }
    }),

    isUserInGroup: (groupId, userId) => new Promise(async (resolve, reject) => {
        try {
            const users = await query(`SELECT *
                                        FROM usersInGroup
                                        WHERE groupId = ? AND userId = ?`, [groupId, userId])

            resolve(users.length > 0)
        } catch (error) {
            reject(error)
        }
    }),

    getGroupById: groupId => new Promise(async (resolve, reject) => {
        try {
            const groups = await query('SELECT * FROM `group` WHERE id = ?', [groupId])
            if (groups.length === 0) return reject(responses.notFound())

            console.log(`groups are: {${JSON.stringify(groups)}`)

            const group = groups[0]

            const fullGroup = {
                ...group,
                messages: await message.getMessages(group.threadId),
                posts: await post.getPostsByGroupId(group.id),
                teachers: await user.getUsersInGroupByRole(group.id, roles.teacher),
                parents: await user.getUsersInGroupByRole(group.id, roles.parent)
            }

            resolve(fullGroup)
        } catch (error) {
            reject(error)
        }
    }),

    addUser: (groupId, userId) => new Promise(async (resolve, reject) => {
        try {
            if (!(await group.doesGroupExists(groupId))) return reject(responses.notFound())
            if (!(await user.doesUserExists(userId))) return reject(responses.notFound())
            if (await group.isUserInGroup(groupId, userId)) return resolve() // the user is already in the group

            await query(`INSERT INTO usersInGroup (groupId, userId)
                   VALUES (?, ?)`, [groupId, userId])

            resolve()
        } catch (error) {
            reject(error)
        }
    }),
    removeUser: (groupId, userId) => new Promise(async (resolve, reject) => {
        try {
            if (!(await group.doesGroupExists(groupId))) return reject(responses.notFound())
            if (!(await user.doesUserExists(userId))) return reject(responses.notFound())
            if (!(await group.isUserInGroup(groupId, userId))) return reject(responses.notFound())

            await query(`DELETE FROM usersInGroup WHERE groupId = ? AND userId = ?`, [groupId, userId])

            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
