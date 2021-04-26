const mongoose = require('mongoose');

const rsvpSchema = mongoose.Schema({
  username: String,
  userId: { type: mongoose.Schema.Types.ObjectId }
})

const postSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    photoUrl: String,
    title: String,
    caption: String,
    rsvp: [rsvpSchema],
    start_date: Date,
    end_date: Date
  })
 

module.exports = mongoose.model('Post', postSchema);