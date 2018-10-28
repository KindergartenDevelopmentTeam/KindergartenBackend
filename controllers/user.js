const user = require('../model/user')
const writer = require('../utils/writer')

module.exports.getUser = (req, res, next) => {
    const userId = req.swagger.params.userId.value

    user
        .getUserById(userId)
        .then(writer.writeJson(res))
        .catch(next)
}