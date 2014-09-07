// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var express        = require('express');
var passport       = require('passport');
var flash 	       = require('connect-flash');
var morgan         = require('morgan');

// required for passport
var bodyParser     = require('body-parser');
var cookieParser   = require('cookie-parser');
var session        = require('express-session');

var Nerd = require('./models/Nerd');
var User = require('./models/User');


// configuration ===========================================
	
// config files
mongoose.connect('mongodb://127.0.0.1:27017/');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)


// required for passport, and
app.use(session({ secret: process.env.SESSION_SECRET || 'detteerenlitenhemmelighetsombarejegvet' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

var port = process.env.PORT || 8080; // set our port

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users

// passportSettings
require('./auth')(passport, User);

// routes ==================================================
//require('./app/routes')(app); // pass our application into our routes
require('./routes')(app, express, Nerd, User, passport);

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app