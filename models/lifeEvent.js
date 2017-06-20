var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var LifeEventSchema = new Schema({
  eventDate: String,
  postDate: String,
  title: String,
  isPublic: Boolean,
  content: String,
  tags: String,
  photo: String,
  userRating: Number,
  userId: String

});

var LifeEvent = mongoose.model('LifeEvent', LifeEventSchema);

module.exports = LifeEvent;
