const express = require('express');
const router = express.Router();
const auth = require('../auth');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Login'});
});

router.get('/welcome', auth.ensureAuthenticated, function(req, res, next) {
  res.render('welcome', { name: req.user.displayName });
});

router.get('/detail', auth.ensureAuthenticated, function(req, res, next) {
  res.render('detail');
});

router.get('/list', auth.ensureAuthenticated, function(req, res, next) {
  res.render('list');
});

router.get('/account', auth.ensureAuthenticated, function(req, res, next) {
  res.render('account', {
    title: 'Account',
    name: req.user.displayName,
    user: JSON.stringify(req.user)
  });
});

module.exports = router;
