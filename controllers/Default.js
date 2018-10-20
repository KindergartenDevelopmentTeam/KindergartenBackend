'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.addChild = function addChild (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var childId = req.swagger.params['childId'].value;
  Default.addChild(groupId,childId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addNote = function addNote (req, res, next) {
  var childId = req.swagger.params['childId'].value;
  var noteId = req.swagger.params['noteId'].value;
  Default.addNote(childId,noteId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.addTeacher = function addTeacher (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var teacherId = req.swagger.params['teacherId'].value;
  Default.addTeacher(groupId,teacherId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.comment = function comment (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var postId = req.swagger.params['postId'].value;
  var commentText = req.swagger.params['commentText'].value;
  Default.comment(groupId,postId,commentText)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.createChild = function createChild (req, res, next) {
  var child = req.swagger.params['child'].value;
  Default.createChild(child)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.deleteGroup = function deleteGroup (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  Default.deleteGroup(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.edit = function edit (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var postId = req.swagger.params['postId'].value;
  var content = req.swagger.params['content'].value;
  Default.edit(groupId,postId,content)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editChild = function editChild (req, res, next) {
  var childId = req.swagger.params['childId'].value;
  var child = req.swagger.params['child'].value;
  Default.editChild(childId,child)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.editPresence = function editPresence (req, res, next) {
  var childId = req.swagger.params['childId'].value;
  var presence = req.swagger.params['presence'].value;
  Default.editPresence(childId,presence)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getChild = function getChild (req, res, next) {
  var childId = req.swagger.params['childId'].value;
  Default.getChild(childId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getChildren = function getChildren (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  Default.getChildren(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getGroup = function getGroup (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  Default.getGroup(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getMessage = function getMessage (req, res, next) {
  var parentId = req.swagger.params['parentId'].value;
  Default.getMessage(parentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getNotes = function getNotes (req, res, next) {
  var childId = req.swagger.params['childId'].value;
  Default.getNotes(childId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getParent = function getParent (req, res, next) {
  var parentId = req.swagger.params['parentId'].value;
  Default.getParent(parentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getParents = function getParents (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  Default.getParents(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPost = function getPost (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var postId = req.swagger.params['postId'].value;
  Default.getPost(groupId,postId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getPosts = function getPosts (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  Default.getPosts(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getTeachers = function getTeachers (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  Default.getTeachers(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.getUsers = function getUsers (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  Default.getUsers(groupId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.like = function like (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var postId = req.swagger.params['postId'].value;
  Default.like(groupId,postId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeChild = function removeChild (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var child = req.swagger.params['child'].value;
  Default.removeChild(groupId,child)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.removeTeacher = function removeTeacher (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var teacher = req.swagger.params['teacher'].value;
  Default.removeTeacher(groupId,teacher)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.sendMessage = function sendMessage (req, res, next) {
  var parentId = req.swagger.params['parentId'].value;
  var message = req.swagger.params['message'].value;
  Default.sendMessage(parentId,message)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.setParent = function setParent (req, res, next) {
  var childId = req.swagger.params['childId'].value;
  var parentId = req.swagger.params['parentId'].value;
  Default.setParent(childId,parentId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.vote = function vote (req, res, next) {
  var groupId = req.swagger.params['groupId'].value;
  var postId = req.swagger.params['postId'].value;
  var the vote to submit = req.swagger.params['The vote to submit'].value;
  Default.vote(groupId,postId,the vote to submit)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};
