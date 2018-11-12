const groupModel = require('../model/group')
const childModel = require('../model/child')
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

module.exports.addChildToGroup = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value
    const child = req.swagger.params.child.value

    childModel
        .createChild(child)
        .then(childId => groupModel.addChild(groupId, childId))
        .then(() => writer.writeJson(res)(responses.success()))
        .catch(next)
}

module.exports.removeChildFromGroup = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value
    const childId = req.swagger.params.childId.value

    groupModel
        .removeChild(groupId, childId)
        .then(() => childModel.deleteChild(childId))
        .then(() => writer.writeJson(res)(responses.success()))
        .catch(next)
}

module.exports.deleteGroup = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value

    groupModel
        .deleteGroup(groupId)
        .then(() => writer.writeJson(res)(responses.success()))
        .catch(next)
}