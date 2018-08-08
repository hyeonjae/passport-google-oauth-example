'use strict';

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const session = require('express-session');
const config = require('./config.json');

const GOOGLE_CLIENT_ID = config.google.clientId;
const GOOGLE_CLIENT_SECRET = config.google.clientSecret;

console.log(`GOOGLE_CLIENT_ID: '${GOOGLE_CLIENT_ID}'`);
console.log(`GOOGLE_CLIENT_SECRET: '${GOOGLE_CLIENT_SECRET}'`);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "/auth/google/callback",   // google api console에 등록되어 있어야 한다.
},
  function (accessToken, refreshToken, profile, done) {
    console.log('accessToken:', accessToken);
    console.log('refreshToken:', refreshToken);

    // asynchronous verification, for effect...
    process.nextTick(function () {

      // To keep the example simple, the user's Google profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the Google account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

const setup = function (app) {
  app.use(session({ secret: 'keyboard cat' }));
  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/google',
    passport.authenticate('google', {
      scope: ['openid', 'https://www.googleapis.com/auth/youtube'], // openid는 google+ 권한이 필요하다.
      accessType: "offline",    // refreshToken을 요구한다.
      prompt: "consent",        // 앱 권한 동의를 구한다.
    }),
    function (req, res) {
      // The request will be redirected to Google for authentication, so this
      // function will not be called.
    });

  app.get('/auth/google/callback',   // google api console에 등록되어 있어야 한다.
    passport.authenticate('google', {
      failureRedirect: '/login',
    }),
    function (req, res) {
      res.redirect(req.session.returnTo || '/');
      delete req.session.returnTo;
    });

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
  });
};

exports.setup = setup;
