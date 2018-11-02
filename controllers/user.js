const writer = require('../utils/writer')

const userModel = require('../model/user')
const messageModel = require('../model/message');


module.exports = {

    getUser: (req, res, next) => {
        const userId = req.swagger.params.userId.value

        userModel
            .getUserById(userId)
            .then(writer.writeJson(res))
            .catch(next)
    },

    sendMessageToUser: async (req, res, next) => {
        const userId = req.swagger.params.userId.value
        const content = req.swagger.params.message.value

        const currentUserId = 2; // todo
        try {
            const thread = await messageModel.getThread([currentUserId, userId])

            messageModel
                .sendMessage(thread.id, content)
                .then(() => writer.writeJson(res)({
                    code: 200,
                    message: 'Message sent successfully'
                }))
                .catch(next)

        } catch (error) {
            next(error)
        }

    },

    getMessagesFromUser: async (req, res, next) => {
        const userId = req.swagger.params.userId.value

        const currentUserId = 2; // todo

        try {
            const thread = await messageModel.getThread([currentUserId, userId])
            const messages = await messageModel.getMessages(thread.id)

            writer.writeJson(res)(messages)

        } catch (error) {
            next(error)
        }
    }
}
