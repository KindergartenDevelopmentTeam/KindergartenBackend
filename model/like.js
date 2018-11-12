const { query, querySingle, transaction, queryWithConnection } = require('../db')
const responses = require('../responses')

module.exports = {
    getLikesForPost: postId => query(`SELECT * FROM \`like\` WHERE postId = ?`, [postId])
}