const express     = require('express');
const router      = express.Router();
const Feeling     = require('../models/feelings.js');
const Post        = require('../models/posts.js');

router.get('/', (req, res)=>{
  Feeling.find({}, (err,foundFeelings)=>{
    res.render('feelings/index.ejs',{
      feelings: foundFeelings
    })
  })
});

//New Feeling
router.get('/new', (req,res)=>{
  if (req.session.logged){
    res.render('feelings/new.ejs');
  } else {
    res.redirect('/users/login');
  }
});
router.post('/', (req,res)=>{
  console.log(req.body);
  Feeling.create(req.body, (err,createdFeeling)=>{
    res.redirect('/feelings');
  })
});

//Show Feeling
router.get('/:id',(req,res)=>{
  Post.find({'feeling':req.params.id}, (err,foundPosts)=>{
    res.render('feelings/show.ejs',{
      feeling: req.params.id,
      posts: foundPosts
    })
  })
})

//Delete Feeling
router.delete('/:id',(req,res)=>{
  Feeling.findByIdAndRemove(req.params.id, ()=>{
    res.redirect('/feelings');
  })
})

module.exports = router;
