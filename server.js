const express = require('express');
const http = require('http');
const path = require('path');
const socketio = require('socket.io')

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(express.static(path.join(__dirname + '/public')));

// run when client connects
io.on('connection', socket => {
    socket.emit('message', 'Welcome to chatcord');

    // Broadcast when a user connects
    socket.broadcast.emit('message', 'A user has joined the chat');

    // runs when a user disconnects
    socket.on('disconnect', ()=>{
        io.emit('message', 'A user has left the chat');
    })

    // listen for chat message
    socket.on('chatMessage', msg =>{
        io.emit('message', msg);
    })

})

const PORT = process.env.PORT || 5000;
server.listen(PORT, ()=> console.log('Server started on localhost:' + PORT ));