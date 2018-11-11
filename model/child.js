const { query, querySingle, transaction, queryWithConnection } = require('../db')
const responses = require('../responses')

module.exports = {
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

    getChildrenFromGroup: (groupId) => query(`
        SELECT child.* FROM child
        JOIN childInGroup cig on child.id = cig.childId
        WHERE cig.groupId = ?
    `, [groupId]),

    getChild: (childId) => querySingle(`
            SELECT * FROM child
            WHERE id = ?
    `, [childId]),

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
            const id = await transaction(async (connection) => {
                await queryWithConnection(
                    connection,
                        `INSERT INTO child (name, parentId)
                         VALUES (?, ?)`,
                    [child.name, child.parentId]
                )

                const id = (await queryWithConnection(connection, `SELECT LAST_INSERT_ID() AS id;`))[0]['id']

                return id
            })

            resolve(id)
        } catch (error) {
            reject(error)
        }
    })



}