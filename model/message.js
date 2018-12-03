const { query, transaction, queryWithConnection } = require('../db')

const flatMap = require('flatmap')

const messageModel = module.exports = {
    getMessages: (threadId, currentUser) => new Promise(async (resolve, reject) => {
        try {
            const messages = await query('SELECT * FROM `message` WHERE threadId = ?', [threadId])

            resolve(messages.map(message => {
                message.wasSentByCurrentUser = currentUser === message.sender
                return message
            }))
        } catch (error) {
            reject(error)
        }
    }),

    sendMessage: (threadId, content, sender) => query(`
        INSERT INTO message (threadId, content, sender)
        VALUES (?, ?, ?)
    `, [threadId, content, sender]),

    getThread: (userIds) => new Promise(async (resolve, reject) => {
        console.log(`userIds: ${JSON.stringify(userIds, null, 2)}`)
        try {
            const joins = userIds.map((userId, index) =>
                `JOIN userInThread AS \`uit${index}\` ON \`uit${index}\`.threadId = thread.id`)
            const wheres = userIds.map((userId, index) => `\`uit${index}\`.userId = ?`)

            const joinStr = joins.join(' ')
            const whereStr = wheres.join(' AND ')

            const threads = await query(`
                SELECT thread.* FROM thread
                JOIN userInThread AS uitMain ON uitMain.threadId = thread.id
                ${joinStr}
                WHERE ${whereStr};
            `, userIds)

            if (threads.length === 0) { // create
                const threads = await messageModel.createThread(userIds, null)
                return resolve(threads[0])
            }

            return resolve(threads[0])

        } catch (error) {
            return reject(error)
        }
    }),

    createThread: (userIds, name) => new Promise((resolve, reject) => {

        const inserts = userIds.map(userId => `(?, ?)`)
        const insertStr = inserts.join(',')


        transaction(async connection => {
            try {
                await queryWithConnection(connection, `INSERT INTO thread (\`name\`) VALUES (?)`, [name])
                const id = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() as id;`))[0]['id']


                const ids = flatMap(flatMap(userIds, userId => [userIds, userId]), alma => alma)

                console.log(`ids: ${JSON.stringify(ids, null, 2)}`)

                await queryWithConnection(
                    connection,
                    `INSERT INTO userInThread (\`threadId\`, \`userId\`) VALUES ${insertStr};`,
                    ids
                )

                const thread = await queryWithConnection(connection, `SELECT * FROM thread WHERE id = ?`, [id])

                resolve(thread)

            } catch (error) {
                connection.rollback()
                reject(error)
            }
        })
    }),

    getThreadForGroup: groupId => {

    }




}