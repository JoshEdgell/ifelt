const express 				= require('express');
const app 						= express();
const mongoose 				= require('mongoose');
const bodyParser 			= require('body-parser');
const methodOverride 	= require('method-override');
const session 				= require('express-session');
const bcrypt					= require('bcrypt');
const ejs							= require('ejs');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(session({
			secret: "This is a random secret string",
			resave: false,
			saveUninitialized: false
}))
app.use(express.static('public'));

const feelingsController = require('./controllers/feelings.js');
app.use('/feelings', feelingsController);
const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);
const sessionController = require('./controllers/session.js');
app.use('/users', sessionController);
const adminController = require('./controllers/admin.js');
app.use('/admin', adminController);

app.get('/', (req, res)=>{
	res.render('index.ejs');
});

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/ifelt'
mongoose.connect(mongoUri);

mongoose.connection.once('open', ()=>{
	console.log('Vandelay Industries, Kel Varnsen speaking');
});

const port = process.env.PORT || 12345;

app.listen(port, ()=>{
	console.log('Dunder Mifflin, this is Pam');
});
