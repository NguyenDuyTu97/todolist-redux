const addUser = (user) => {
    return {
        type: 'ADD_USER',
        payload: user,
    }
};

const editUser = (user) => {
    return {
        type: 'EDIT_USER',
        payload: user,
    }
};

const deleteUser = (uuid) => {
    return {
        type: 'DELETE_USER',
        uuid,
    }
};

const updateStatusUser = (user) => {
    return {
        type: 'UPDATE_STATUS_USER',
        payload: user,
    }
};

export {
    addUser,
    editUser,
    deleteUser,
    updateStatusUser,
}