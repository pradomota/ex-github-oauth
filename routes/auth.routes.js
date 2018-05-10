const express = require('express');
const router = express.Router();
const auth = require('../controllers/auth.controller');

router.get('/login', auth.login);

module.exports = router;
