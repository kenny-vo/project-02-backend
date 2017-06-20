var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
  userName: String,
  userId: String
});

var User = mongoose.model('User', UserSchema);

module.exports = User;
