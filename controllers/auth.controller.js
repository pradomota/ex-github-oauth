const passport = require('passport');

module.exports.login = (req, res, next) => {
  res.render('auth/login');
}

module.exports.githubAuthCb = (req, res, next) => {
  passport.authenticate('github-auth', (error, user) => {
    if (error) {
      next(error);
    } else {
      req.login(user, (error) => {
        if (error) {
          next(error);
        } else {
          res.redirect('/profile');
        }
      });
    }
  })(req, res, next);
}

module.exports.logout = (req, res, next) => {
  req.logout();
  res.redirect('/login');
}