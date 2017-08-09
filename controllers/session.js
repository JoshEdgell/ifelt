const express     = require('express');
const router      = express.Router();
const User        = require('../models/users.js');
const Post        = require('../models/posts.js');
const bcrypt      = require('bcrypt');

//All Users
router.get('/',(req,res)=>{
  User.find({},(err,foundUsers)=>{
    res.render('users/index.ejs',{
      users: foundUsers
    })
  })
})

//User Login Screen
router.get('/login',(req,res)=>{
  res.render('users/login.ejs', {
    passwordFail: false
  })
})
router.get('/login/retry', (req,res)=>{
  res.render('users/login.ejs', {
    passwordFail: true
  })
})

//Log Out
router.get('/logout',(req,res)=>{
  req.session.destroy((err)=>{
    if(err){

    } else {
      res.redirect('/');
    }
  })
})

//Check Password
router.post('/login',(req,res)=>{
  User.findOne({username : req.body.username }, (err,foundUser)=>{
    if (foundUser){
      if(bcrypt.compareSync(req.body.password, foundUser.password)){
        req.session.username = req.body.username;
        req.session.logged = true;
        res.redirect('/users/home/' + foundUser._id)
      } else {
        res.redirect('/users/login/retry');
      }
    } else {
      res.redirect('/users/login/retry');
    }
  })
})

//Register New User
router.get('/register',(req,res)=>{
  res.render('users/register.ejs', {
    firstInput: '',
    lastInput: '',
    usernameInput: '',
    passwordFail: false
  });
})
router.post('/register',(req,res)=>{
  if (req.body.password !== req.body.password2) {
    res.render('users/register.ejs', {
      passwordFail: true,
      firstInput: req.body.firstName,
      lastInput: req.body.lastName,
      usernameInput: req.body.username
    });
  } else {
      const password = req.body.password
      //Going with level 8 because I know this isn't top-secret enough to require level 10 security.
      const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));
      const userDbEntry = {};
      userDbEntry.firstName = req.body.firstName;
      userDbEntry.lastName = req.body.lastName;
      userDbEntry.username = req.body.username;
      userDbEntry.password = passwordHash;
      console.log(userDbEntry);
      User.create(userDbEntry, (err,user)=>{
        req.session.username = user.username;
        req.session.logged = true;
        res.redirect('/');
    })
  }
})




router.get('/home',(req,res)=>{
  if (req.session.logged){
    User.find({'username':req.session.username},(err,foundUser)=>{
      res.redirect('/users/home/' + foundUser[0]._id)
    })
  } else {
    res.redirect('/users/login');
  }
})

router.get('/home/:id', (req,res)=>{
  User.findById(req.params.id, (err,foundUser)=>{
    res.render('users/userpage.ejs', {
      user: foundUser,
      posts: foundUser.posts
    })
  })
})

router.get('/:id',(req,res)=>{
  User.findById(req.params.id,(err,foundUser)=>{
    Post.findOne
    res.render('users/show.ejs', {
      user: foundUser
    })
  })
})



module.exports  = router;
