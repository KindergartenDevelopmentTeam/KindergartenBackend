const { query } = require('../db')

module.exports.getPathById = (pathId) => query(`SELECT x, y FROM pathElements WHERE pathId = ?`, [pathId])