const express = require('express');
const router = express.Router();
const users = require('../controllers/users.controller.js');

router.get('/', users.getAll);
router.get('/:id', users.getById);

router.put('/:id', users.update);
router.delete('/:id', users.remove);

module.exports = router;
