const express = require('express');
const router = express.Router();
const chatService = require('./chat.service');

// routes
router.post('/createMessage', chatService.createMessage);
router.post('/createChat', chatService.createChat);
router.post('/createChatNameFromUsers', chatService.createChatNameFromUsers);
router.post('/getTime', chatService.getTime);

module.exports = router;

function socket(req, res, next) {
    chatService.create(req.body)
        .then(chat => chat ? res.json(chat) : res.status(400).json({ message: 'Chat request is incorrect' }))
        .catch(err => next(err));
}

function createChat(req, res, next) {
    chatService.create(req.body)
}