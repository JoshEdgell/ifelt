const mongoose = require('mongoose');
const Post = require('./posts.js');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String,
  posts: [Post.schema]

});

module.exports = mongoose.model('Users', userSchema);
