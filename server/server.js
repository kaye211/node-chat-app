const path = require('path');

const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const app = express();

var server = http.createServer(app);
//configure for socketio
var io = socketIO(server);
//configure express static middleware
app.use(express.static(publicPath));
//start up server

io.on('connection', socket => {
	console.log('New connection');

	socket.on('disconnect', () => {
		console.log('disconnected from client');
	});
	// socket.emit('newEmail', {
	// 	sender: 'bonelli@rep.com',
	// 	text: 'hi',
	// });
	socket.emit('newMessage', {
		sender: 'bonelli@rep.com',
		text: 'hi',
		createdAt: 23,
	});
	// socket.on('createEmail', newEmail => {
	// 	console.log('createEmail', newEmail);
	// });

	socket.on('createMessage', newMessage => {
		console.log('createMessage', newMessage);
	});
});
server.listen(port, () => {
	console.log(`Server started at ${port} `);
});
