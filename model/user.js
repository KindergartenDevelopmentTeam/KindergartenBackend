const { query } = require('../db')
const responses = require('../responses')

module.exports = {
    doesUserExists: userId => new Promise(async (resolve, reject) => {
        try {
            const users = await query(`SELECT *
                                       from user
                                       WHERE id = ?`, [userId])
            resolve(users.length > 0)
        } catch (error) {
            reject(error)
        }
    }),

    getUsersInGroup: (groupId) => query(`
            SELECT user.id, user.name, user.scope, user.username FROM user
            JOIN usersInGroup uIG on user.id = uIG.userId
            WHERE uIG.groupId = ?
        `, [groupId]),

    getUsersInGroupByRole: (groupId, role) => query(`
            SELECT user.id, user.name, user.scope, user.username FROM user
            JOIN usersInGroup uIG on user.id = uIG.userId
            WHERE uIG.groupId = ?
              AND scope = ?
        `, [groupId, role]),

    getUserById: (userId) => new Promise((resolve, reject) => {
        query(`SELECT * FROM user WHERE id = ?`, [userId])
            .then(users => {
                if (users.length === 0) return reject(responses.notFound())

                resolve(users[0])
            })
            .catch(reject)
    })

}