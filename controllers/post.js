const writer = require('../utils/writer')

const responses = require('../responses')

const postModel = require('../model/post')

module.exports.getPost = (req, res, next) => {
    const postId = req.swagger.params.postId.value

    const currentUserId = 1 // todo

    postModel
        .doesPostExists(postId)
        .then(doesPostExists => {
            if (!doesPostExists) throw responses.notFound()
        })
        .then(() => postModel.userHasPerMissionToViewPost(postId, currentUserId))
        .then(hasPermission => {
            if (!hasPermission) throw responses.noPermission()
        })
        .then(() => postModel.getPostById(postId))
        .then(writer.writeJson(res))
        .catch(next)

}

module.exports.likePost = (req, res, next) => {
    const postId = req.swagger.params.postId.value

    const currentUserId = 1 // todo

    postModel
        .doesPostExists(postId)
        .then(doesPostExists => {
            if (!doesPostExists) throw responses.notFound()
        })
        .then(() => postModel.userHasPerMissionToViewPost(postId, currentUserId))
        .then(hasPermission => {
            if (!hasPermission) throw responses.noPermission()
        })
        .then(() => postModel.like(postId, currentUserId))
        .then(doesUserLikePost => ({
            ...responses.success(doesUserLikePost ? "successfully liked post" : "successfully disliked post"),
            doesUserLikePost: doesUserLikePost
        }))
        .then(writer.writeJson(res))
        .catch(next)
}

module.exports.commentOnPost = (req, res, next) => {
    const postId = req.swagger.params.postId.value
    const comment = req.swagger.params.comment.value

    const currentUserId = 1 // todo

    postModel
        .doesPostExists(postId)
        .then(doesPostExists => {
            if (!doesPostExists) throw responses.notFound()
        })
        .then(() => postModel.userHasPerMissionToViewPost(postId, currentUserId))
        .then(hasPermission => {
            if (!hasPermission) throw responses.noPermission()
        })
        .then(() => postModel.comment(postId, currentUserId, comment))
        .then(() => responses.success("successfully commented on post"))
        .then(writer.writeJson(res))
        .catch(next)
}