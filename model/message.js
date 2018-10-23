const { query } = require('../db')

module.exports = {
    getMessages: (threadId) => query('SELECT * FROM `message` WHERE threadId = ?', [threadId])
}