'use strict';

const utils = require('../utils/writer.js');

const groupController = require('../model/group')

module.exports.addChild = function addChild(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var childId = req.swagger.params['childId'].value;
    Index.addChild(groupId, childId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.addNote = function addNote(req, res, next) {
    var childId = req.swagger.params['childId'].value;
    var noteId = req.swagger.params['noteId'].value;
    Index.addNote(childId, noteId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.addTeacher = function addTeacher(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var teacherId = req.swagger.params['teacherId'].value;
    Index.addTeacher(groupId, teacherId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.comment = function comment(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var postId = req.swagger.params['postId'].value;
    var commentText = req.swagger.params['commentText'].value;
    Index.comment(groupId, postId, commentText)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.createChild = function createChild(req, res, next) {
    var child = req.swagger.params['child'].value;
    Index.createChild(child)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.deleteGroup = function deleteGroup(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    Index.deleteGroup(groupId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.edit = function edit(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var postId = req.swagger.params['postId'].value;
    var content = req.swagger.params['content'].value;
    Index.edit(groupId, postId, content)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.editChild = function editChild(req, res, next) {
    var childId = req.swagger.params['childId'].value;
    var child = req.swagger.params['child'].value;
    Index.editChild(childId, child)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.editPresence = function editPresence(req, res, next) {
    var childId = req.swagger.params['childId'].value;
    var presence = req.swagger.params['presence'].value;
    Index.editPresence(childId, presence)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getChild = function getChild(req, res, next) {
    var childId = req.swagger.params['childId'].value;
    Index.getChild(childId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getChildren = function getChildren(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    Index.getChildren(groupId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};


module.exports.getGroup = function getGroup(req, res, next) {
    groupController
        .getGroupById(req, res, next)
        .then(group => utils.writeJson(res, group))
};


module.exports.getMessage = function getMessage(req, res, next) {
    var parentId = req.swagger.params['parentId'].value;
    Index.getMessage(parentId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getNotes = function getNotes(req, res, next) {
    var childId = req.swagger.params['childId'].value;
    Index.getNotes(childId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getParent = function getParent(req, res, next) {
    var parentId = req.swagger.params['parentId'].value;
    Index.getParent(parentId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getParents = function getParents(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    Index.getParents(groupId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getPost = function getPost(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var postId = req.swagger.params['postId'].value;
    Index.getPost(groupId, postId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getPosts = function getPosts(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    Index.getPosts(groupId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getTeachers = function getTeachers(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    Index.getTeachers(groupId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.getUsers = function getUsers(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    Index.getUsers(groupId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.like = function like(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var postId = req.swagger.params['postId'].value;
    Index.like(groupId, postId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.removeChild = function removeChild(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var child = req.swagger.params['child'].value;
    Index.removeChild(groupId, child)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.removeTeacher = function removeTeacher(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var teacher = req.swagger.params['teacher'].value;
    Index.removeTeacher(groupId, teacher)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.sendMessage = function sendMessage(req, res, next) {
    var parentId = req.swagger.params['parentId'].value;
    var message = req.swagger.params['message'].value;
    Index.sendMessage(parentId, message)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.setParent = function setParent(req, res, next) {
    var childId = req.swagger.params['childId'].value;
    var parentId = req.swagger.params['parentId'].value;
    Index.setParent(childId, parentId)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};

module.exports.vote = function vote(req, res, next) {
    var groupId = req.swagger.params['groupId'].value;
    var postId = req.swagger.params['postId'].value;
    var vote = req.swagger.params['vote'].value;
    Index.vote(groupId, postId, vote)
        .then(function (response) {
            utils.writeJson(res, response);
        })
        .catch(function (response) {
            utils.writeJson(res, response);
        });
};
