const USERS_LOCAL_STORAGE = "users_redux";

const initialState = {
    list: localStorage.getItem(USERS_LOCAL_STORAGE)
        ? JSON.parse(localStorage.getItem(USERS_LOCAL_STORAGE))
        : [],
};

const setUsersLocalStorage = (users) => {
    if (!users) return;
    localStorage.setItem(USERS_LOCAL_STORAGE, JSON.stringify(users));
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_USER': {
            let newList = [...state.list];
            newList.push(action.payload);
            setUsersLocalStorage(newList);

            return {
                ...state,
                list: newList,
            }
        }
        case 'EDIT_USER': {
            let newList = [...state.list];
            let idx = newList.findIndex(c => c.uuid === action.payload.uuid);
            if (idx < 0) return state;

            newList[idx] = action.payload;
            setUsersLocalStorage(newList);

            return {
                ...state,
                list: newList,
            }
        }
        case 'DELETE_USER': {
            let newList = [...state.list].filter(c => c.uuid !== action.uuid);
            setUsersLocalStorage(newList);

            return {
                ...state,
                list: newList,
            }
        }
        case 'UPDATE_STATUS_USER': {
            let newList = [...state.list];
            let itemIdx = newList.findIndex(c => c.uuid === action.payload.uuid);

            if (itemIdx >= 0) {
                const [removed] = newList.splice(itemIdx, 1); //get element is deleted
                removed.status = action.payload.status;

                let statusesDestination = [...newList].reduce((preValue, currentValue, currentIndex) => {
                    if (currentValue.status === action.payload.status) {
                        preValue.push({
                            status: currentValue.status,
                            indexOriginalArray: currentIndex,
                        });
                    }
                    return preValue;
                }, []);

                let length = statusesDestination.length;
                if (length === 0) newList.unshift(removed);
                else {
                    let idxStatusDestination = statusesDestination.findIndex((c, index) => index === action.payload.indexDestination);

                    if (idxStatusDestination > -1) {
                        newList.splice(statusesDestination[idxStatusDestination].indexOriginalArray, 0, removed);
                    }
                    else {
                        newList.splice(statusesDestination[length - 1].indexOriginalArray + 1, 0, removed);
                    }
                }
            }

            setUsersLocalStorage(newList);

            return {
                ...state,
                list: newList,
            }
        }

        default:
            return state;
    }
}

export default userReducer;
