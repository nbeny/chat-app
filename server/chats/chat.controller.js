const express = require('express');
const router = express.Router();
const userService = require('./chat.service');

// routes
router.post('/socket', socket);

module.exports = router;

function socket(req, res, next) {
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}