const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');
const passport = require('passport');

router.get('/login', auth.login);
router.post('/auth/github', 
    passport.authenticate('github-auth', 
        { scope: ['user:email'] }));
router.get('/auth/github/cb', auth.githubAuthCb);
router.get('/logout', auth.logout);

module.exports = router;
