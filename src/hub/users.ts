const users = [];

const addUser = ({ id, name, room }): { error, user } => {
    const _name = name.trim().toLowerCase();
    const _room = room.trim().toLowerCase();

    // a user may enter from mulitple devices at a time but id will be different..
    const existingUser = users.find((user) => user.id === id && user.name === _name && user.room === _room);

    const user = { id, name: _name, room: _room };
    if (!existingUser) { users.push(user); }
    return { error: null, user: user };
};

const removeUser = (id): { error, user } => {
    const index = users.findIndex((x) => x.id === id);
    if (index !== -1) {
        const removedUser = users.splice(index, 1)[0];
        return { user: removedUser, error: null };
    }
    return { error: 'Cannot find user to remove', user: null };
};

const getUser = (id): { error, user } => { // returns  { error, user }
    const user = users.find((x) => x.id === id);
    if (user) { return { user, error: null }; }
    return { error: 'User not found', user: null };
};

const getUsersInRoom = (room): { error, users } => { // returns  { error, users }
    const usersInRoom = users.find((x) => x.room === room.trim().toLowerCase());
    return { error: null, users: usersInRoom };
};

export {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
};

