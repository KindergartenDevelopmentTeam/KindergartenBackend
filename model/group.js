const { query, transaction, queryWithConnection } = require('../db')
const writer = require('../utils/writer')
const responses = require('../responses')
const { roles } = require('../constants')

const message = require('./message')
const post = require('./post')
const user = require('./user')
const child = require("./child");

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

    isChildInGroup: (groupId, childId) => new Promise(async (resolve, reject) => {
        try {
            const children = await query(`SELECT *
                                        FROM childInGroup
                                        WHERE groupId = ? AND childId = ?`, [groupId, childId])

            resolve(children.length > 0)
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
                parents: await user.getUsersInGroupByRole(group.id, roles.parent),
                users: await user.getUsersInGroup(group.id),
                children: await child.getChildrenFromGroup(group.id)
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
    }),
    addChild: (groupId, childId) => new Promise(async (resolve, reject) => {
        try {
            console.log(`childId: ${JSON.stringify(childId, null, 2)}`)
            if (!(await group.doesGroupExists(groupId))) return reject(responses.notFound())
            if (!(await child.doesChildExists(childId))) return reject(responses.notFound())
            if (await group.isChildInGroup(groupId, childId)) return resolve()

            await query(`INSERT INTO childInGroup (groupId, childId) VALUES (?, ?)`, [groupId, childId])

            resolve()

        } catch (error) {
            reject(error)
        }
    }),

    removeChild: (groupId, childId) => new Promise(async (resolve, reject) => {
        try {

            if (!(await group.doesGroupExists(groupId))) return reject(responses.notFound())
            if (!(await child.doesChildExists(childId))) return reject(responses.notFound())
            if (!(await group.isChildInGroup(groupId, childId))) return reject(responses.notFound())

            await query(`DELETE FROM childInGroup WHERE groupId = ? AND childId = ?`, [groupId, childId])

            resolve()

        } catch (error) {
            reject(error)
        }
    }),

    deleteGroup: (groupId) => new Promise (async (resolve, reject) => {
        try {
            if (!(await group.doesGroupExists(groupId))) return reject(responses.notFound())

            transaction(async connection => {
                try {

                    await queryWithConnection(connection, `DELETE
                                                           FROM usersInGroup
                                                           WHERE groupId = ?`, [groupId])

                    const childrenIds = (await queryWithConnection(connection, `SELECT id
                                                                            FROM childInGroup
                                                                            WHERE groupId = ?`, [groupId]))
                        .map(child => child.id)


                    await queryWithConnection(connection, `DELETE
                                                           FROM presence
                                                           WHERE childId IN ${childrenIdSql}`, childrenIds)

                    await queryWithConnection(connection, `DELETE
                                                           FROM note
                                                           WHERE childId IN ${childrenIdSql}`, childrenIds)

                    await queryWithConnection(connection, `DELETE
                                                           FROM childInGroup
                                                           WHERE groupId = ?`, [groupId])

                    // todo test
                    await queryWithConnection(connection, `DELETE
                                                           FROM child
                                                           WHERE id IN ${childrenIdSql}`, childrenIds)

                    console.log(`WHERE id IN ${childrenIdSql}`)

                    await queryWithConnection(connection, `DELETE
                                                           FROM image
                                                           WHERE id IN (SELECT id
                                                                        FROM post
                                                                        WHERE groupId = ?)`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM vote
                                                           WHERE pollId IN (SELECT poll.id
                                                                            FROM poll
                                                                            JOIN post ON post.pollId = poll.id
                                                                            WHERE groupId = ?)`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM pollOption
                                                           WHERE pollId IN (SELECT poll.id
                                                                            FROM poll
                                                                            JOIN post ON post.pollId = poll.id
                                                                            WHERE groupId = ?)`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM poll
                                                           WHERE id IN (SELECT id
                                                                        FROM post
                                                                        WHERE groupId = ?)`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM post
                                                           WHERE groupId = ?`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM message
                                                           WHERE threadId IN (SELECT threadId
                                                                              FROM \`group\`
                                                                              WHERE id = ?)`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM userInThread
                                                           WHERE threadId IN (SELECT threadId
                                                                              FROM \`group\`
                                                                              WHERE id = ?)`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM thread
                                                           WHERE id IN (SELECT threadId
                                                                              FROM \`group\`
                                                                              WHERE id = ?)`, [groupId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM \`group\`
                                                           WHERE id = ?`, [groupId])

                    connection.commit()
                    resolve()

                } catch (error) {
                    connection.rollback()
                    reject(error)
                }
            })

        } catch (error) {
            reject(error)
        }
    })
}
