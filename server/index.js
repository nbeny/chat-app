require('rootpath')();
const express = require('express');
const app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
const cors = require('cors');
const bodyParser = require('body-parser');

const jwt = require('_helpers/jwt');
const errorHandler = require('_helpers/error-handler');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// use JWT auth to secure the api
app.use(jwt());

// api routes
app.use('/users', require('users/user.controller'));
app.use('/chats', require('chats/chat.controller'));

// global error handler
app.use(errorHandler);

// start Socket IO
const SocketManager = require('SocketManager')
io.on('connection', SocketManager)

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});