const express     = require('express');
const router      = express.Router();
const Feeling     = require('../models/feelings.js');
const Post        = require('../models/posts.js');
const User        = require('../models/users.js');

router.get('/',(req,res)=>{
  res.render('admin/index.ejs');
})

router.get('/feelings',(req,res)=>{
  Feeling.find({}, (err,Feelings)=>{
    res.render('admin/feelings.ejs', {
      feelings: Feelings
    })
  })
})
router.delete('/feeling/:id',(req,res)=>{
  Feeling.findByIdAndRemove(req.params.id, (err,foundFeeling)=>{
    res.redirect('/admin/feelings');
  })
})

router.get('/posts',(req,res)=>{
  Post.find({}, (err,Posts)=>{
    res.render('admin/posts.ejs', {
      posts: Posts
    })
  })
})
router.delete('/post/:id',(req,res)=>{
  Post.findByIdAndRemove(req.params.id, (err,foundPost)=>{
    res.redirect('/admin/posts');
  })
})

router.get('/users',(req,res)=>{
  User.find({}, (err,Users)=>{
    res.render('admin/users.ejs', {
      users: Users
    })
  })
})
router.delete('/user/:id',(req,res)=>{
  User.findByIdAndRemove(req.params.id, (err, foundUser)=>{
    res.redirect('/admin/users');
  })
})


module.exports = router;
