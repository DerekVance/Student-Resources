var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.HOST);
var login = db.get('login');
var bcrypt = require('bcryptjs');
var verifyLogin = require('../lib/login-errors.js')


router.get('/', function(req, res, next) {

  res.render('login/index', {title: 'Galvanize Student Resource Board'});
});



router.post('/', function( req, res, next) {
  // check the database for login information
  // if user exists, check if passwords match
  // if passwords match, redirect to whatever page you want to the use to go to

  var emailin = req.body.email;
  var passwordin = req.body.password;
  var very = verifyLogin(emailin, passwordin);
    if(very.length > 0) {
        res.render('login/index', {title: 'Galvanize Student Resource Board', error: very});
    } else {
        login.findOne({ email: emailin }, function (err, record) {
            if (record.email === emailin)
              bcrypt.compare(passwordin, record.password, function(err, result) {
                if(result ===  true)
                var auth = res.cookie('User', record.username);
                  res.redirect('/board');
                if(result === false)
                  res.render('login/index');
              });
        });
      };
});


router.get('/login/new', function(req, res, next) {
  res.render('login/new', { title: 'Create a New Login' });
});

router.get('/login/confirm', function(req, res) {
  res.render('login/confirm');
});


router.post('/login/new', function (req, res, next) {
  // validate user input (ie make sure it is not blank)
  // if user input is good, generate a hashed password (bcryptjs)
  // save username, email and hashed password in database
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var passwordConfirm= req.body.password_confirm;

  var errorArr=[]
  if(email.trim() === ''){
    errorArr.push('Please enter a valid Email address');
  }
  if (username.trim() === '') {
    errorArr.push('Please enter a username');
  }
  if (password.length < 6) {
    errorArr.push('Please use a password longer than 6 characters')
  }
  if (passwordConfirm.trim() != password.trim()) {
    errorArr.push("Passwords do not match");
  }
  if(errorArr.length) {
    res.render('login/new', { errors: errorArr, title: 'Create a New Login' });
  } else {
    bcrypt.hash(password, 8, function(err, hash) {
      login.insert({
        email: email,
        username: username,
        password: hash
      });
      res.redirect('/login/confirm');
    });
  }
});




module.exports = router;
