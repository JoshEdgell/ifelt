const mongoose = require('mongoose');
const Comment = require('./comments.js');

const postSchema = new mongoose.Schema({
  title: String,
  authorFirstName: String,
  authorLastName: String,
  authorUserName: String,
  feeling: String,
  postBody: String,
  comments: [Comment.schema]
});

module.exports = mongoose.model('Posts', postSchema);
