const mysql = require('mysql')

const pool  = mysql.createPool({
    host     : process.env.DATABASE_HOST,
    user     : process.env.DATABASE_USER,
    password : process.env.DATABASE_PASSWORD,
    database : 'kindergarten',
    multipleStatements: true
})


const getConnection = new Promise((resolve, reject) => {
    pool.getConnection((error, connection) => {
        if (error) return reject(error)
        return resolve(connection)
    })
})

module.exports.escape = (dataToEscape) => getConnection.escape(dataToEscape)

module.exports.transaction = (callback) => new Promise(async (resolve, reject) => {
    const connection = await getConnection;

    connection.beginTransaction(async error => {
        if (error) return reject(error)

        try {
            const data = await callback(connection)

            connection.commit(error => {
                if (error) {
                    return connection.rollback(() => reject(error))
                }

                resolve(data)

            })
        } catch (error) {
            return connection.rollback(() => reject(error))
        }
    })
})

module.exports.query = (query, data = []) => new Promise((resolve, reject) => {
    getConnection
        .then(connection => {
            connection.query(query, data, (error, data) => {
                if (error) return reject(error)
                return resolve(data)
            })
        })
        .catch(reject)
})

module.exports.queryWithConnection = (connection, query, data = []) => new Promise((resolve, reject) => {
    connection.query(query, data, (error, data) => {
        if (error) return reject(error)
        return resolve(data)
    })
})

module.exports.createDb = () => {
    // TODO
}

