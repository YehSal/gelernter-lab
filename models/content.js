var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = require('./user');

var schema = new Schema({
    name: {
        type: String,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    },
    file : {
        type: String
    },
    tags: {
        type: String
    }
});

// Update user when a message is deleted
schema.post('remove', function(content) {
    User.findById(content.user, function(err, user) {
        user.contents.pull(content);
        user.save();
    });
});




module.exports = mongoose.model('Content', schema);
