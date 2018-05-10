const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller');
const secure = require('../middlewares/secure.mid');

router.get('/profile', secure.isAuthenticated, users.profile);

module.exports = router;
