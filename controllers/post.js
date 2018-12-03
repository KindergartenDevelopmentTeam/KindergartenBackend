const writer = require('../utils/writer')

const responses = require('../responses')

const postModel = require('../model/post')
const groupModel = require('../model/group')

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
        .then(like => res.end(`${like}`))
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

module.exports.createPost = (req, res, next) => {
    const groupId = req.swagger.params.groupId.value
    const post = req.swagger.params.post.value

    console.log(`post: ${JSON.stringify(post, null, 2)}`)

    const currentUserId = 1 // todo

    groupModel
        .doesGroupExists(groupId)
        .then(doesGroupExists => {
            if (!doesGroupExists) throw responses.notFound()
        })
        .then(() => groupModel.hasUserAccessToGroup(groupId, currentUserId))
        .then(hasUserAccessToGroup => {
            if (!hasUserAccessToGroup) throw responses.noPermission()
        })
        .then(() => postModel.createPost(groupId, currentUserId, post))
        .then(postId => {
            console.log(`postId: ${postId}`)
            return postId
        })
        .then(postId => res.end("" + postId))
        .catch(next)

}

module.exports.vote = (req, res, next) => {
    const postId = req.swagger.params.postId.value
    const option = req.swagger.params.option.value

    const currentUserId = 1 // todo

    postModel
        .vote(postId, currentUserId, option)
        .then(() => writer.writeJson(res)(responses.success("Successfully voted on poll")))
        .catch(next)
}

module.exports.editPost = (req, res, next) => {

    const post = req.swagger.params.post.value
    const postId = req.swagger.params.postId.value

    console.log(`post: ${JSON.stringify(post, null, 2)}`)

    const currentUserId = 1 // todo

    postModel
        .hasUserPermissionToPost(currentUserId, postId)
        .then(hasUserPermissionToPost => {
            if (!hasUserPermissionToPost) throw responses.noPermission()
        })
        .then(() => postModel.getPostById(postId))
        .then((oldPost) => postModel.editPost(postId, post, oldPost, currentUserId))
        .then(() => responses.success('post successfully edited'))
        .then(writer.writeJson(res))
        .catch(next)

}