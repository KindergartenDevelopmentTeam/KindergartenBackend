const { query } = require('../db')

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
        `, [groupId, role])
}