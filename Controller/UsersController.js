const express = require('express');
const router = express.Router();
const User = require('../Models/User');

router.get('/signin', (req, res) => {
    res.send("Sign In page");
});

module.exports = router;