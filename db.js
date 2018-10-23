var mysql = require('mysql')

var pool  = mysql.createPool({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : 'kindergarten'
})


const getConnection = new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
        if (error) return reject(error)
        return resolve(connection)
    })
})


module.exports.query = (query, data = []) => new Promise((resolve, reject) => {
    getConnection.then(connection => {
        connection.query(query, data, (error, data) => {
            if (error) return reject(error)
            //connection.release() // TODO ?
            return resolve(data)
        })
    })
})

module.exports.createDb = () => {
    this.query(`
        CREATE TABLE IF NOT EXISTS \`groups\` (
            \`id\` int(11) unsigned NOT NULL AUTO_INCREMENT,
            \`name\` varchar(50) NOT NULL DEFAULT '',
            \`creationDate\` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (\`id\`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;
    `)

    this.query(``)
}

