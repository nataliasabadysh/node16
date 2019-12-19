const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const Users = require("../models/users.model");

module.exports = function(passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        Users.findOrCreate(
          {
            googleId: profile.id,
            name: profile._json.name,
            avatar: profile._json.picture,
            email: profile._json.email
          },
          function(err, user) {
            return cb(err, user);
          }
        );
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:5000/auth/facebook/callback"
      },
      function(accessToken, refreshToken, profile, cb) {
        Users.findOrCreate(
          { facebookId: profile.id, name: profile._json.name },
          function(err, user) {
            return cb(err, user);
          }
        );
      }
    )
  );

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
