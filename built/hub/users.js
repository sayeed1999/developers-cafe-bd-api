"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersInRoom = exports.getUser = exports.removeUser = exports.addUser = void 0;
const users = [];
const addUser = ({ id, name, room }) => {
    const _name = name.trim().toLowerCase();
    const _room = room.trim().toLowerCase();
    // a user may enter from mulitple devices at a time but id will be different..
    const existingUser = users.find((user) => user.id === id && user.name === _name && user.room === _room);
    const user = { id, name: _name, room: _room };
    if (!existingUser) {
        users.push(user);
    }
    return { user };
};
exports.addUser = addUser;
const removeUser = (id) => {
    const index = users.findIndex((x) => x.id === id);
    if (index !== -1) {
        const removedUser = users.splice(index, 1)[0];
        return { user: removedUser };
    }
    return { error: 'Cannot find user to remove' };
};
exports.removeUser = removeUser;
const getUser = (id) => {
    const user = users.find((x) => x.id === id);
    if (user) {
        return { user };
    }
    return { error: 'User not found' };
};
exports.getUser = getUser;
const getUsersInRoom = (room) => {
    const usersInRoom = users.find((x) => x.room === room.trim().toLowerCase());
    return { users: usersInRoom };
};
exports.getUsersInRoom = getUsersInRoom;
//# sourceMappingURL=users.js.map