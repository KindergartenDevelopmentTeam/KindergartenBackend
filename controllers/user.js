const writer = require('../utils/writer')

const userModel = require('../model/user')
const messageModel = require('../model/message');


module.exports = {

    getCurrentUserId: (req, res, next) => {
        const userId = req.userId

        res.end(userId.toString())
    },

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

        const currentUserId = req.userId;
        //const currentUserId = 1;
        try {
            const thread = await messageModel.getThread([currentUserId, userId])

            messageModel
                .sendMessage(thread.id, content, currentUserId)
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

        //const currentUserId = req.userId;
        const currentUserId = 1;

        try {
            const thread = await messageModel.getThread([currentUserId, userId])
            const messages = await messageModel.getMessages(thread.id, req.userId)

            writer.writeJson(res)(messages)

        } catch (error) {
            next(error)
        }
    },

    createUser: (req, res, next) => {
        const user = req.swagger.params.user.value

        userModel
            .createUser(user)
            .then(userId => ({id: userId}))
            .then(writer.writeJson(res))
            .catch(next)
    },

    deleteUser: (req, res, next) => {
        const userId = req.swagger.params.userId.value

        userModel.deleteUser()
            .then(() => writer.writeJson(res)("user deleted"))
            .catch(next)
    }
}
