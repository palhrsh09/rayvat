const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller.js');

router.post('/', users.register);
router.post('/:id', users.login);

module.exports = router;
