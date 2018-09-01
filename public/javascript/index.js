var socket = io();
socket.on('connect', function() {
	console.log('Connected to server ');
	// socket.emit('createEmail', {
	// 	to: 'Paul',
	// 	text: 'Hey',
	// });
	socket.emit('createMessage', {
		from: 'Obande',
		text: 'Hey',
	});
});
socket.on('disconnect', function() {
	console.log('Disconnected from server');
});

// socket.on('newEmail', function(email) {
// 	console.log('New Email', email);
// });
socket.on('newMessage', function(message) {
	console.log('New Message', message);
});
