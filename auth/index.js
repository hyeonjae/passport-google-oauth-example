'use strict';

const ensureAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) { return next(); }

  req.session.returnTo = req.path;
  res.redirect('/login');
};

exports.ensureAuthenticated = ensureAuthenticated;