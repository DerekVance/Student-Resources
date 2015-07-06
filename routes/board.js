var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.HOST);
var resources = db.get('resources');
var verify = require('../lib/board-errors.js')

router.get('/board', function(req, res, next) {
  resources.find({}, {sort: {subject: 1}}, function (err, data) {
  res.render('board', {
    title: 'Galvanize Student Resource Board',
    entries: data
    });
  });
});


router.get('/board/new', function(req, res, next) {
  res.render('board/new', { title: 'Enter a New Resource' });
});

router.post('/board', function (req, res, next) {
  var subject = req.body.subject;
  var url = req.body.url;
  var description= req.body.description;
  var title = req.body.title;
  var very = verify(subject, url, description, title)
    if (very.length > 0) {
      res.render('board/new', {title: 'Enter a New Resource', error: very})
    } else {
  resources.insert({
    subject: subject,
    url: url,
    description: description,
    title: title
  });
  res.redirect('/board')
}
});







module.exports = router;
