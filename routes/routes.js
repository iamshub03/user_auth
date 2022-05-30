//External Imports
const express = require('express');
const { append } = require('express/lib/response');
const res = require('express/lib/response');
const router = express.Router();

//Internal Imports
const Users = require('../Controller/UsersController');

router.use('/users', Users);

module.exports = router;