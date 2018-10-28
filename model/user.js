const { query } = require('../db')
const notFoundError = require('../errors/404')

module.exports = {
    getUsersInGroup: (groupId) => query(`
            SELECT * FROM user
            JOIN usersInGroup uIG on user.id = uIG.userId
            WHERE uIG.groupId = ?
        `, [groupId]),

    getUsersInGroupByRole: (groupId, role) => query(`
            SELECT * FROM user
            JOIN usersInGroup uIG on user.id = uIG.userId
            WHERE uIG.groupId = ?
              AND roleId = ?
        `, [groupId, role]),

    getUserById: (userId) => new Promise(async (resolve, reject) => {
        const users = await query(`SELECT * FROM user WHERE id = ?`, [userId])

        if (users.length === 0) return reject(notFoundError())

        return resolve(users[0])
    })

}