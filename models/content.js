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
});

// Update user when a message is deleted
schema.post('remove', function(message) {
    User.findById(message.user, function(err, user) {
        user.contents.pull(message);
        user.save();
    });
});

module.exports = mongoose.model('Content', schema);
