const writer = require('../utils/writer')

const responses = require('../responses')

const childModel = require('../model/child')


module.exports = {

    getChild: async (req, res, next) => {
        const childId = req.swagger.params.childId.value

        try {

            let child = await childModel.getChild(childId)
            console.log(child)
            child = (await childModel.appendNotesToChildren([child]))[0]
            child = (await childModel.appendPresenceToChildren([child]))[0]

            writer.writeJson(res)(child)

        } catch (error) {
            next(error)
        }

    },

    addNoteToChild: async (req, res, next) => {

        const childId = req.swagger.params.childId.value
        const note = req.swagger.params.note.value

        try {

            let child = await childModel.getChild(childId)
            if (!child) return next(responses.notFound())

            await childModel.createNote(childId, note)

            writer.writeJson(res)(responses.success('Note added successfully'))

        } catch (error) {
            next(error)
        }

    },

    getNotesOfChild: async (req, res, next) => {

        const childId = req.swagger.params.childId.value

        try {

            let child = await childModel.getChild(childId)
            if (!child) return next(responses.notFound())

            const notes = (await childModel.appendNotesToChildren([child]))[0].notes || []

            writer.writeJson(res)(notes)

        } catch (error) {
            next(error)
        }

    },

    editChild: async (req, res, next) => {

        const childId = req.swagger.params.childId.value
        const child = req.swagger.params.child.value

        try {

            let originalChild = await childModel.getChild(childId)
            if (!originalChild) return next(responses.notFound())

            await childModel.editChild(child)

            writer.writeJson(res)(responses.success('Child was edited successfully'))

        } catch (error) {
            next(error)
        }

    },

    editPresenceOfChild: async (req, res, next) => {

        const childId = req.swagger.params.childId.value
        const presence = req.swagger.params.presence.value

        try {

            let originalChild = await childModel.getChild(childId)
            if (!originalChild) return next(responses.notFound())

            await childModel.setPresence(childId, presence)

            writer.writeJson(res)(responses.success('The presence was successfully set'))

        } catch (error) {
            next(error)
        }

    },

    createChild: async (req, res, next) => {

        const child = req.swagger.params.child.value


        try {

            const id = await childModel.createChild(child)

            writer.writeJson(res)({
                id: id
            })

        } catch (error) {
            next(error)
        }

    },

}
