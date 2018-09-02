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
	//Greeting message to user from admin
	socket.emit('newMessage', {
		from: 'Admin',
		text: 'Welcome new user',
		createdAt: new Date().getTime(),
	});
	//broadcast message to chat room
	socket.broadcast.emit('newMessage', {
		from: 'Admin',
		text: 'New user joined room',
		createdAt: new Date().getTime(),
	});

	socket.on('createMessage', message => {
		console.log('createMessage', message);
		//emit to every connection
		io.emit('newMessage', {
			from: message.from,
			text: message.text,
			createdAt: new Date().getTime(),
		});
		//broadcast to all users
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
