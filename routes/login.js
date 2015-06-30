var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.HOST);
var login = db.get('login');
var bcrypt = require('bcryptjs');

router.get('/', function(req, res, next) {
  res.render('login/index');
});

router.get('/login/new', function(req, res, next) {
  res.render('login/new', { title: 'Galvanize Student Resource Baord' });
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
  if(email.trim() === '')
    errorArr.push('Please enter a valid Email address');
  if (username.trim() === '')
    errorArr.push('Please enter a username');
  if (passwordConfirm.trim() != password.trim())
    errorArr.push("Passwords do not match");
  if(errorArr.length) {
    res.render('login/new', { errors: errorArr });
  } else {
    bcrypt.hash(req.body.password, 8, function(err, hash) {
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
