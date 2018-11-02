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

    getUserById: (userId) => new Promise((resolve, reject) => {
        query(`SELECT * FROM user WHERE id = ?`, [userId])
            .then(users => {
                if (users.length === 0) return reject(notFoundError())

                resolve(users[0])
            })
            .catch(reject)
    })

}