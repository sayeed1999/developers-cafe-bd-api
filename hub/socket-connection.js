const { Server } = require('socket.io');
const {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
} = require('./users');

// server is of type http.Server
const socketConnection = (server) => {
    const io = new Server(server, {
        cors: true,
        origin: ['http://localhost:3000', 'https://developers-cafe-bd.vercel.app'],
    });

    io.on('connection', (socket) => {
        console.log('a user is connected');

        socket.on('join', ({ name, room }, callback) => {
            console.log(`${name} has joined on ${room}`);
            const { error, user } = addUser({ id: socket.id, name, room });
            if (error) return callback(error);
            // joins a specific room!
            socket.join(user.room);
            socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
            socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

            return callback();
        });

        socket.on('sendMessage', (message, callback) => {
            const { user, error } = getUser(socket.id);
            console.log(user, error);
            if (error) return callback(error);
            // only broadcasts message to that room the user has joined on line no. 57!
            io.to(user.room).emit('message', { user: user.name, text: message });
            return callback();
        });

        socket.on('disconnect', (callback) => {
            const { user, error } = removeUser(socket.id);
            if (error) return callback(error);
            console.log(`${user.name} had left!!`);
            return callback();
        });
    });
};

module.exports = socketConnection;
