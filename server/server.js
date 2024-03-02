// Your server code

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);

    // Extract sender and receiver usernames
    const [, receiver] = msg.match(/to (\w+):/);

    // Simulate an automatic response from the receiver after a short delay
    setTimeout(() => {
      let automaticResponse = '';
      switch (Math.floor(Math.random() * 3)) {
        case 0:
          automaticResponse = `${receiver} to ${socket.username}: Thanks for your message!`;
          break;
        case 1:
          automaticResponse = `${receiver} to ${socket.username}: I'm here and ready to chat.`;
          break;
        case 2:
          automaticResponse = `${receiver} to ${socket.username}: How can I assist you?`;
          break;
        default:
          automaticResponse = `${receiver} to ${socket.username}: Default automatic response.`;
      }
      io.emit('chat message', automaticResponse);
    }, 1000);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is running on port 4000');
});
