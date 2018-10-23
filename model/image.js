const { query } = require('../db')

module.exports = {
    getImageById: imageId => query(`SELECT * FROM image WHERE id = ?`, [imageId])
}