const group = require('../model/group')
const writer = require('../utils/writer')

module.exports.getGroup = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value

    group
        .getGroupById(groupId)
        .then(writer.writeJson(res))
        .catch(next)
};