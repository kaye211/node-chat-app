const path = require('path');

const http = require('http');
const publicPath = path.join(__dirname, '../public');
const express = require('express');
const socketIO = require('socket.io');
const port = process.env.PORT || 3000;
const app = express();

const { generateMessage } = require('./utils/message');

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
	//Greeting message to user from admin
	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chatroom'));

	//broadcast message to chat room
	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User Joined'));
	socket.on('createMessage', (message, callback) => {
		console.log('createMessage', message);
		//emit to every connection
		io.emit('newMessage', generateMessage(message.from, message.text));
		//acknowledgement
		callback('This is from server');
		//broadcasst to all users
		// socket.broadcast.emit('newMessage', {
		// 	from: message.from,
		// 	text: message.text,
		// 	createdAt: new Date().getTime(),
		// });
	});
});
server.listen(port, () => {
	console.log(`Server started at ${port} `);
});
