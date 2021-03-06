const users = [];

const addUser = ({ id, name, room }) => { // returns  { error, user }
    const _name = name.trim().toLowerCase();
    const _room = room.trim().toLowerCase();

    // a user may enter from mulitple devices at a time but id will be different..
    const existingUser = users.find((user) => user.id === id && user.name === _name && user.room === _room);

    const user = { id, name: _name, room: _room };
    if (!existingUser) { users.push(user); }
    return { user };
};

const removeUser = (id) => { // returns  { error, user }
    const index = users.findIndex((x) => x.id === id);
    if (index !== -1) {
        const removedUser = users.splice(index, 1)[0];
        return { user: removedUser };
    }
    return { error: 'Cannot find user to remove' };
};

const getUser = (id) => { // returns  { error, user }
    const user = users.find((x) => x.id === id);
    if (user) { return { user }; }
    return { error: 'User not found' };
};

const getUsersInRoom = (room) => { // returns  { error, users }
    const usersInRoom = users.find((x) => x.room === room.trim().toLowerCase());
    return { users: usersInRoom };
};

export {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};

