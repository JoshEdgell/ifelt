const express     = require('express');
const router      = express.Router();
const Feeling     = require('../models/feelings.js');
const Post        = require('../models/posts.js');
const User        = require('../models/users.js');

router.get('/',(req,res)=>{
  Post.find({}, (err,foundPosts)=>{
    res.render('posts/index.ejs',{
      posts: foundPosts
    })
  })
})

//Create New Post
router.get('/new/:id', (req, res)=>{
  User.findById(req.params.id, (err,foundUser)=>{
    Feeling.find({}, (err,foundFeelings)=>{
      res.render('posts/new.ejs', {
        user: foundUser,
        feelings: foundFeelings,
      })
    })
  })
});
router.post('/:id/:first/:last/:username',(req,res)=>{
  req.body.authorFirstName = req.params.first;
  req.body.authorLastName = req.params.last;
  req.body.authorUserName = req.params.username;
  User.findById(req.params.id, (err,foundUser)=>{
    Post.create(req.body, (err,createdPost)=>{
      foundUser.posts.push(createdPost);
      foundUser.save((err,data)=>{
        res.redirect('/');
      })
    })
  })
})

//View Individual Post
router.get('/:id', (req,res)=>{
  Post.findById(req.params.id, (err,foundPost)=>{
    res.render('posts/show.ejs', {
      post: foundPost
    })
  })
})

//Delete Post
router.delete('/:id',(req,res)=>{
  Post.findByIdAndRemove(req.params.id, (err, foundPost)=>{
    User.findOne({'posts._id':req.params.id}, (err, foundUser)=>{
      foundUser.posts.id(req.params.id).remove();
      foundUser.save((err,data)=>{
        res.redirect('/');
      })
    })
  })
})

//Edit Post
router.get('/:id/edit',(req,res)=>{
  Post.findById(req.params.id, (err,foundPost)=>{
    User.findOne({'posts._id':req.params.id}, (err,foundUser)=>{
      res.render('posts/edit.ejs',{
        post: foundPost,
        user: foundUser
      })
    })
  })
})
router.put('/edit/:id',(req,res)=>{
  Post.findByIdAndUpdate(req.params.id, req.body, {new:true}, (err,updatedPost)=>{
    User.findOne({'posts._id' : req.params.id}, (err,foundUser)=>{
      foundUser.posts.id(req.params.id).remove();
      foundUser.posts.push(updatedPost);
      foundUser.save((err,data)=>{
        res.redirect('/users/home/' + foundUser._id)
      })
    })
  })
})

module.exports  = router;
