import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { genUuid, action, } from '../../common';
import { addUser, editUser, deleteUser, updateStatusUser, } from '../../actions/user';
import Work from '../work';

function TodoList() {
    //state of this component
    const [userName, setUserName] = useState('');
    const [userEdit, setUserEdit] = useState({});
    const [typeAction, setTypeAction] = useState(action.ADD);

    //state of store
    const users = useSelector(state => { //get state in store
        // console.log(state, "state");
        return state.user.list;
    });

    const dispatch = useDispatch(); // call action in reducer of store


    function onChangeUserName(e) {
        const { value, } = e && e.target;
        setUserName(value);
    }

    function handleAddUser() {
        if (typeAction.ADD) {
            let newUser = {
                uuid: genUuid(),
                name: userName,
                status: Math.trunc(Math.random() * 3) + 1,
            };

            dispatch(addUser(newUser));
            setUserName('');
        }
        else {
            let newUser = {
                ...userEdit,
                name: userName,
            };

            dispatch(editUser(newUser));
            setUserEdit({});
            setUserName('');
        }
    }

    function handleEditUser(user) {
        setTypeAction(action.EDIT);
        setUserName(user.name);
        setUserEdit(user);
    }

    function handleDeleteUser(uuid) {
        let confirm = window.confirm("Do you delete this user?");
        if (confirm) dispatch(deleteUser(uuid));
    }

    function handleChangeStatusUser(user) {
        dispatch(updateStatusUser(user))
    }

    return (
        <div className="container">
            <h2>This is todo list redux javascript 17501903</h2>
            <div id="heading">
                <input
                    name='username'
                    value={userName}
                    onChange={(e) => onChangeUserName(e)}
                />
                <button
                    onClick={handleAddUser}
                >
                    Save
                </button>
            </div>
            <div id="main">
                <Work
                    users={users}
                    handleEditUser={handleEditUser}
                    handleDeleteUser={handleDeleteUser}
                    handleChangeStatusUser={handleChangeStatusUser}
                />
            </div>
        </div>
    );
}

export default TodoList;