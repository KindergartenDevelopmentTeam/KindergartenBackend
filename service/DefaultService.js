'use strict';


/**
 * adds a child
 * adds a child to the group
 *
 * groupId Integer The id of the group
 * childId Integer The id of the child to add
 * no response value expected for this operation
 **/
exports.addChild = function(groupId,childId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * adds a note
 * adds a note to the child
 *
 * childId Integer The id of the child
 * noteId Integer The Id of the note to add
 * no response value expected for this operation
 **/
exports.addNote = function(childId,noteId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * adds a teacher
 * adds a teacher to the group
 *
 * groupId Integer The id of the group
 * teacherId Integer The Id of the teacher to add
 * no response value expected for this operation
 **/
exports.addTeacher = function(groupId,teacherId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * makes a comment
 * makes a comment on the post
 *
 * groupId Integer The id of the group
 * postId Integer The id of the post
 * commentText String The text of the comment
 * no response value expected for this operation
 **/
exports.comment = function(groupId,postId,commentText) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * create a child
 * crete a child
 *
 * child Child A child object to create (optional)
 * no response value expected for this operation
 **/
exports.createChild = function(child) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * deletes the group
 * deletes the group
 *
 * groupId Integer The id of the group
 * no response value expected for this operation
 **/
exports.deleteGroup = function(groupId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * edits the post
 * edites the text of the post
 *
 * groupId Integer The id of the group
 * postId Integer The id of the post
 * content Post The edited post
 * no response value expected for this operation
 **/
exports.edit = function(groupId,postId,content) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * edit a child
 * edit a child
 *
 * childId Integer The id of the child
 * child Child The modified Child object
 * no response value expected for this operation
 **/
exports.editChild = function(childId,child) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * edit a child's presence
 * edit a child's presence
 *
 * childId Integer The id of the child
 * presence Presence The presence object.
 * no response value expected for this operation
 **/
exports.editPresence = function(childId,presence) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Gets a child
 * Gets a child
 *
 * childId Integer The id of the child
 * returns Child
 **/
exports.getChild = function(childId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "parent" : {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  },
  "notes" : [ {
    "id" : 51,
    "content" : "Your kid was good today"
  }, {
    "id" : 51,
    "content" : "Your kid was good today"
  } ],
  "name" : "John Doe",
  "id" : 51,
  "presence" : [ {
    "date" : "",
    "id" : 51,
    "wasThere" : true
  }, {
    "date" : "",
    "id" : 51,
    "wasThere" : true
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets children
 * Gets a list of all the children of the group
 *
 * groupId Integer The id of the group
 * returns List
 **/
exports.getChildren = function(groupId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "parent" : {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  },
  "notes" : [ {
    "id" : 51,
    "content" : "Your kid was good today"
  }, {
    "id" : 51,
    "content" : "Your kid was good today"
  } ],
  "name" : "John Doe",
  "id" : 51,
  "presence" : [ {
    "date" : "",
    "id" : 51,
    "wasThere" : true
  }, {
    "date" : "",
    "id" : 51,
    "wasThere" : true
  } ]
}, {
  "parent" : {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  },
  "notes" : [ {
    "id" : 51,
    "content" : "Your kid was good today"
  }, {
    "id" : 51,
    "content" : "Your kid was good today"
  } ],
  "name" : "John Doe",
  "id" : 51,
  "presence" : [ {
    "date" : "",
    "id" : 51,
    "wasThere" : true
  }, {
    "date" : "",
    "id" : 51,
    "wasThere" : true
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets a group
 * Gets a group
 *
 * groupId Integer The id of the group
 * returns Group
 **/
exports.getGroup = function(groupId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "children" : [ {
    "parent" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "notes" : [ {
      "id" : 51,
      "content" : "Your kid was good today"
    }, {
      "id" : 51,
      "content" : "Your kid was good today"
    } ],
    "name" : "John Doe",
    "id" : 51,
    "presence" : [ {
      "date" : "",
      "id" : 51,
      "wasThere" : true
    }, {
      "date" : "",
      "id" : 51,
      "wasThere" : true
    } ]
  }, {
    "parent" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "notes" : [ {
      "id" : 51,
      "content" : "Your kid was good today"
    }, {
      "id" : 51,
      "content" : "Your kid was good today"
    } ],
    "name" : "John Doe",
    "id" : 51,
    "presence" : [ {
      "date" : "",
      "id" : 51,
      "wasThere" : true
    }, {
      "date" : "",
      "id" : 51,
      "wasThere" : true
    } ]
  } ],
  "teachers" : [ {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  }, {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  } ],
  "name" : "Kamilla Csoport",
  "messages" : [ {
    "id" : 51,
    "creationDate" : "",
    "content" : "Hi, how are you?"
  }, {
    "id" : 51,
    "creationDate" : "",
    "content" : "Hi, how are you?"
  } ],
  "id" : 51,
  "creationDate" : "",
  "posts" : [ {
    "image" : {
      "path" : "grouppicture.jpg",
      "id" : 51
    },
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "comments" : [ {
      "creator" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "id" : 51,
      "creationDate" : "",
      "content" : "Ok, got it"
    }, {
      "creator" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "id" : 51,
      "creationDate" : "",
      "content" : "Ok, got it"
    } ],
    "id" : 51,
    "poll" : {
      "options" : [ "Blue", "Blue" ],
      "votes" : [ {
        "id" : 51,
        "user" : {
          "role" : {
            "name" : "Admin",
            "id" : 51
          },
          "name" : "John Doe",
          "id" : 51
        },
        "option" : 1
      }, {
        "id" : 51,
        "user" : {
          "role" : {
            "name" : "Admin",
            "id" : 51
          },
          "name" : "John Doe",
          "id" : 51
        },
        "option" : 1
      } ],
      "id" : 51
    },
    "creationDate" : "",
    "content" : "Hey Everyone! Bring blue shoes tomorrow!",
    "likes" : [ {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      }
    }, {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      }
    } ]
  }, {
    "image" : {
      "path" : "grouppicture.jpg",
      "id" : 51
    },
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "comments" : [ {
      "creator" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "id" : 51,
      "creationDate" : "",
      "content" : "Ok, got it"
    }, {
      "creator" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "id" : 51,
      "creationDate" : "",
      "content" : "Ok, got it"
    } ],
    "id" : 51,
    "poll" : {
      "options" : [ "Blue", "Blue" ],
      "votes" : [ {
        "id" : 51,
        "user" : {
          "role" : {
            "name" : "Admin",
            "id" : 51
          },
          "name" : "John Doe",
          "id" : 51
        },
        "option" : 1
      }, {
        "id" : 51,
        "user" : {
          "role" : {
            "name" : "Admin",
            "id" : 51
          },
          "name" : "John Doe",
          "id" : 51
        },
        "option" : 1
      } ],
      "id" : 51
    },
    "creationDate" : "",
    "content" : "Hey Everyone! Bring blue shoes tomorrow!",
    "likes" : [ {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      }
    }, {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      }
    } ]
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get messages
 * get messages from user
 *
 * parentId Integer The id of the parent
 * returns List
 **/
exports.getMessage = function(parentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 51,
  "creationDate" : "",
  "content" : "Hi, how are you?"
}, {
  "id" : 51,
  "creationDate" : "",
  "content" : "Hi, how are you?"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * get all notes
 * get all notes from a child
 *
 * childId Integer The id of the child
 * returns List
 **/
exports.getNotes = function(childId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "id" : 51,
  "content" : "Your kid was good today"
}, {
  "id" : 51,
  "content" : "Your kid was good today"
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets a parent
 * Gets a parent by id
 *
 * parentId Integer The id of the parent
 * returns User
 **/
exports.getParent = function(parentId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "role" : {
    "name" : "Admin",
    "id" : 51
  },
  "name" : "John Doe",
  "id" : 51
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets parents
 * Gets a list of all the parents of children in the group
 *
 * groupId Integer The id of the group
 * returns List
 **/
exports.getParents = function(groupId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "role" : {
    "name" : "Admin",
    "id" : 51
  },
  "name" : "John Doe",
  "id" : 51
}, {
  "role" : {
    "name" : "Admin",
    "id" : 51
  },
  "name" : "John Doe",
  "id" : 51
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets a post
 * Gets a post of the group
 *
 * groupId Integer The id of the group
 * postId Integer The id of the post
 * returns Post
 **/
exports.getPost = function(groupId,postId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "image" : {
    "path" : "grouppicture.jpg",
    "id" : 51
  },
  "creator" : {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  },
  "comments" : [ {
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "id" : 51,
    "creationDate" : "",
    "content" : "Ok, got it"
  }, {
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "id" : 51,
    "creationDate" : "",
    "content" : "Ok, got it"
  } ],
  "id" : 51,
  "poll" : {
    "options" : [ "Blue", "Blue" ],
    "votes" : [ {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "option" : 1
    }, {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "option" : 1
    } ],
    "id" : 51
  },
  "creationDate" : "",
  "content" : "Hey Everyone! Bring blue shoes tomorrow!",
  "likes" : [ {
    "id" : 51,
    "user" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    }
  }, {
    "id" : 51,
    "user" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    }
  } ]
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets posts
 * Gets a list of all the posts of the group
 *
 * groupId Integer The id of the group
 * returns List
 **/
exports.getPosts = function(groupId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "image" : {
    "path" : "grouppicture.jpg",
    "id" : 51
  },
  "creator" : {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  },
  "comments" : [ {
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "id" : 51,
    "creationDate" : "",
    "content" : "Ok, got it"
  }, {
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "id" : 51,
    "creationDate" : "",
    "content" : "Ok, got it"
  } ],
  "id" : 51,
  "poll" : {
    "options" : [ "Blue", "Blue" ],
    "votes" : [ {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "option" : 1
    }, {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "option" : 1
    } ],
    "id" : 51
  },
  "creationDate" : "",
  "content" : "Hey Everyone! Bring blue shoes tomorrow!",
  "likes" : [ {
    "id" : 51,
    "user" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    }
  }, {
    "id" : 51,
    "user" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    }
  } ]
}, {
  "image" : {
    "path" : "grouppicture.jpg",
    "id" : 51
  },
  "creator" : {
    "role" : {
      "name" : "Admin",
      "id" : 51
    },
    "name" : "John Doe",
    "id" : 51
  },
  "comments" : [ {
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "id" : 51,
    "creationDate" : "",
    "content" : "Ok, got it"
  }, {
    "creator" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    },
    "id" : 51,
    "creationDate" : "",
    "content" : "Ok, got it"
  } ],
  "id" : 51,
  "poll" : {
    "options" : [ "Blue", "Blue" ],
    "votes" : [ {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "option" : 1
    }, {
      "id" : 51,
      "user" : {
        "role" : {
          "name" : "Admin",
          "id" : 51
        },
        "name" : "John Doe",
        "id" : 51
      },
      "option" : 1
    } ],
    "id" : 51
  },
  "creationDate" : "",
  "content" : "Hey Everyone! Bring blue shoes tomorrow!",
  "likes" : [ {
    "id" : 51,
    "user" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    }
  }, {
    "id" : 51,
    "user" : {
      "role" : {
        "name" : "Admin",
        "id" : 51
      },
      "name" : "John Doe",
      "id" : 51
    }
  } ]
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets teachers
 * Gets a list of all the teachers of the group
 *
 * groupId Integer The id of the group
 * returns List
 **/
exports.getTeachers = function(groupId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "role" : {
    "name" : "Admin",
    "id" : 51
  },
  "name" : "John Doe",
  "id" : 51
}, {
  "role" : {
    "name" : "Admin",
    "id" : 51
  },
  "name" : "John Doe",
  "id" : 51
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Gets users
 * Gets a list of all the teachers and parents of the group
 *
 * groupId Integer The id of the group
 * returns List
 **/
exports.getUsers = function(groupId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "role" : {
    "name" : "Admin",
    "id" : 51
  },
  "name" : "John Doe",
  "id" : 51
}, {
  "role" : {
    "name" : "Admin",
    "id" : 51
  },
  "name" : "John Doe",
  "id" : 51
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * makes a like
 * makes or removes a like on the post
 *
 * groupId Integer The id of the group
 * postId Integer The id of the post
 * no response value expected for this operation
 **/
exports.like = function(groupId,postId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * removes a child
 * removes a child from the group
 *
 * groupId Integer The id of the group
 * child Integer The id of the child to remove from the gorup (optional)
 * no response value expected for this operation
 **/
exports.removeChild = function(groupId,child) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * removes a teacher
 * removes a teacher from the group
 *
 * groupId Integer The id of the group
 * teacher Integer The id of the teacher to remove (optional)
 * no response value expected for this operation
 **/
exports.removeTeacher = function(groupId,teacher) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * send a message
 * send a message
 *
 * parentId Integer The id of the parent
 * message Message The message to send
 * no response value expected for this operation
 **/
exports.sendMessage = function(parentId,message) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * set a child's parent
 * set a child's parent
 *
 * childId Integer The id of the child
 * parentId Integer The id of the childs parent.
 * no response value expected for this operation
 **/
exports.setParent = function(childId,parentId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * makes a vote
 * makes a vote on a poll inside a post
 *
 * groupId Integer The id of the group
 * postId Integer The id of the post
 * the vote to submit Vote The text of the comment
 * no response value expected for this operation
 **/
exports.vote = function(groupId,postId,the vote to submit) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}

