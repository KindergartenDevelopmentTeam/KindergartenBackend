const { query, querySingle, transaction, queryWithConnection } = require('../db')
const responses = require('../responses')

const childModel = module.exports = {
    doesChildExists: childId => new Promise(async (resolve, reject) => {
        try {
            const children = await query(`SELECT *
                                          FROM child
                                          WHERE id = ?`, childId)

            resolve(children.length > 0)
        } catch (error) {
            reject(error)
        }
    }),

    getChildrenFromGroup: (groupId) => new Promise(async (resolve, reject) => {
        try {
            const childIds = await query(`SELECT childId as id
                                          FROM childInGroup
                                          WHERE groupId = ?`, [groupId])

            const children = await Promise.all(childIds.map(childId => {
                return childModel.getChild(childId['id'])
            }))

            resolve(children)

        } catch (error) {
            reject(error)
        }


    }),

    getChild: (childId) => new Promise(async (resolve, reject) => {
        try {
            const child = await querySingle(`
              SELECT *
              FROM child
              WHERE id = ?
            `, [childId])

            console.log('child')

            const parentId = child.parentId
            const presences = await query(`SELECT id, wasThere, date FROM presence WHERE childId = ?`, [childId])
            const notes = await query(`SELECT id, note as content FROM note WHERE childId = ?`, [childId])

            resolve({
                id: child.id,
                name: child.name,
                parentId: parentId,
                presences: presences,
                notes: notes
            })

        } catch (error) {
            reject(error)
        }
    }),

    editChild: (child) => query(`
        UPDATE child SET name = ?, parentId = ? WHERE id = ?
    `, [child.name, child.parentId, child.id]),

    appendNotesToChildren: (children) => new Promise(async (resolve, reject) => {
        try {
            const childrenWithNotes = await Promise.all(children.map(async child => {
                const notes = await query(`SELECT *
                                           FROM note
                                           WHERE childId = ?`, [child.id])

                return {
                    ...child,
                    notes: notes
                }
            }))

            resolve(childrenWithNotes)
        } catch (error) {
            reject(error)
        }
    }),

    appendPresenceToChildren: (children) => new Promise(async (resolve, reject) => {
        try {
            const childrenWithPresences = await Promise.all(children.map(async child => {
                const presences = await query(`SELECT *
                                           FROM presence
                                           WHERE childId = ?`, [child.id])

                return {
                    ...child,
                    presences: presences
                }
            }))

            resolve(childrenWithPresences)
        } catch (error) {
            reject(error)
        }
    }),

    createNote: (childId, note) => query(`
        INSERT INTO note (childId, note) VALUES (?, ?)
    `, [childId, note]),

    setPresence: async (childId, presence) => {
        const currentPresence = await query(
            `SELECT * FROM presence WHERE childId = ? AND date = ?`,
            [childId, presence.date]
        )

        if (currentPresence.length === 0) { // insert new presence
            return query(
                `INSERT INTO presence (childId, wasThere, date) VALUES (?, ?, ?)`,
                [childId, presence.wasThere, presence.date]
            )
        }

        // update
        return query(
            `UPDATE presence SET wasThere = ? WHERE childId = ? AND date = ?`,
            [presence.wasThere, childId, presence.date]
        )
    },

    createChild: (child) => new Promise(async (resolve, reject) => {
        try {
            await transaction(async (connection) => {
                try {
                    await queryWithConnection(
                        connection,
                            `INSERT INTO child (name, parentId)
                             VALUES (?, ?)`,
                        [child.name, child.parentId]
                    )

                    const id = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id;`))[0]['id']

                    connection.commit()

                    resolve(id)

                } catch (error) {
                    connection.rollback()
                    reject(error)
                }
            })
        } catch (error) {
            reject(error)
        }
    }),

    deleteChild: childId => new Promise(async (resolve, reject) => {
        try {

            if(!(await childModel.doesChildExists(childId))) return reject(responses.notFound())

            transaction(async connection => {
                try {

                    await queryWithConnection(connection, `DELETE
                                                           FROM presence
                                                           WHERE childId = ?`, [childId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM note
                                                           WHERE childId = ?`, [childId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM childInGroup
                                                           WHERE childId = ?`, [childId])

                    await queryWithConnection(connection, `DELETE
                                                           FROM child
                                                           WHERE id = ?`, [childId])

                    connection.commit()

                    resolve()

                } catch (error) {
                    connection.rollback()
                    reject(error)
                }
            })

            await query(`DELETE FROM child WHERE id = ?`, [childId])

        } catch (error) {
            reject(error)
        }
    })

}