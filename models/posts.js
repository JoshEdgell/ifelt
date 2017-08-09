const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  authorFirstName: String,
  authorLastName: String,
  authorUserName: String,
  feeling: String,
  postBody: String
});

module.exports = mongoose.model('Posts', postSchema);
