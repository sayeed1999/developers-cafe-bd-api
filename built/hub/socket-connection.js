// import { Server } from 'socket.io';
// import {
//     addUser,
//     removeUser,
//     getUser,
//     getUsersInRoom,
// } from './users';
// // server is of type http.Server
// const socketConnection = (server) => {
//     const io = new Server(server, {
//         cors: true,
//         origin: ['http://localhost:3000', 'https://developers-cafe-bd.vercel.app'],
//     });
//     io.on('connection', (socket) => {
//         console.log('a user is connected');
//         socket.on('join', ({ name, room }, callback) => {
//             console.log(`${name} has joined on ${room}`);
//             const { error, user } = addUser({ id: socket.id, name, room });
//             if (error) return callback(error);
//             // joins a specific room!
//             socket.join(user.room);
//             // broadcast to this client only
//             socket.emit('message', { user: 'admin', text: `${user.name}, welcome to the room ${user.room}` });
//             // broadcasts to every socket connections in the room but the sender
//             socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined the chat!` });
//             return callback();
//         });
//         socket.on('sendMessage', (message, callback) => {
//             const { user, error } = getUser(socket.id);
//             if (error) return callback(error);
//             // broadcast to every socket connections in the room
//             io.to(user.room).emit('message', { user: user.name, text: message });
//             return callback();
//         });
//         socket.on('leave', ({ room }) => {
//             socket.leave(room);
//             const { user, error } = removeUser(socket.id);
//             if (error) console.log(error);
//             // broadcasts to every socket connections in the room but the sender
//             socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left the chat!` });
//             // console.log(`${user.name} had left!!`);
//         });
//     });
// };
// export default socketConnection;
//# sourceMappingURL=socket-connection.js.map