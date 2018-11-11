const groupModel = require('../model/group')
const writer = require('../utils/writer')
const responses = require("../responses");

module.exports.getGroup = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value

    groupModel
        .getGroupById(groupId)
        .then(writer.writeJson(res))
        .catch(next)
};

module.exports.addUserToGroup = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value
    const teacherId = req.swagger.params.userId.value

    groupModel
        .addUser(groupId, teacherId)
        .then(() => writer.writeJson(res)(responses.success()))
        .catch(next)
}

module.exports.removeUserFromGroup = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value
    const teacherId = req.swagger.params.userId.value

    groupModel
        .removeUser(groupId, teacherId)
        .then(() => writer.writeJson(res)(responses.success()))
        .catch(next)
}