var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.HOST);
var resources = db.get('resources');


router.get('/board', function(req, res, next) {
  res.render('board/index', { title: 'Galvanize Student Resource Baord' });
});


router.get('/board/new', function(req, res, next) {
  res.render('board/new', { title: 'Galvanize Student Resource Baord' });
});










module.exports = router;
