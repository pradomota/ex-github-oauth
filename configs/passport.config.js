const User = require('../models/user.model');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;


passport.serializeUser((user, next) => {
  next(null, user.id);
});

passport.deserializeUser((id, next) => {
  User.findById(id)
    .then(user => next(null, user))
    .catch(next);
});

passport.use('github-auth', new GitHubStrategy({
  clientID: process.env.GH_CLIENT_ID,
  clientSecret: process.env.GH_CLIENT_SECRET,
  callbackURL: process.env.GH_CLIENT_CB_URL || '/auth/github/cb'
}, (accessToken, refreshToken, profile, next) => {
  console.log(profile);
  const githubId = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0] ? profile.emails[0].value : undefined;

  if (githubId && name && email) {
    User.findOne({ $or: [
      { githubId: githubId },
      { email: email },
      ]})
      .then(user => {
        if (user) {
          next(null, user);
        } else {
          user = new User({
            name: name,
            email: email,
            githubId: githubId
          })

          return user.save()
            .then(user => next(null, user))
        }
      })
      .catch(next)
  } else {
    throw new Error('Invalid profile data');
  }
}))
