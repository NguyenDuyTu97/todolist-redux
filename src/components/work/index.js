import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// fake data generator
const reorder = (list, startIndex, endIndex) => {
    const newList = { ...list };
    const [removed] = newList.users.splice(startIndex, 1);
    newList.users.splice(endIndex, 0, removed);

    return newList;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination, indexDropSource, indexDropDestination) => {
    const sourceClone = { ...source };
    const destClone = { ...destination };
    const [removed] = sourceClone.users.splice(droppableSource.index, 1);

    destClone.users.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[indexDropSource] = sourceClone;
    result[indexDropDestination] = destClone;

    return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

function getUsersByStatus(users) {
    let noActivated = users.filter(c => c.status === 1);
    let activated = users.filter(c => c.status === 2);
    let disabled = users.filter(c => c.status === 3);

    let res = [
        {
            status: 1,
            users: noActivated,
            statusName: "Chưa kích hoạt",
        },
        {
            status: 2,
            users: activated,
            statusName: "Đã kích hoạt",
        },
        {
            status: 3,
            users: disabled,
            statusName: "Đã vô hiệu hóa",
        }
    ];

    return res;
}

function Work(props) {
    const { users, handleChangeStatusUser, handleDeleteUser, handleEditUser, } = props;
    const [usersUpdate, setUsersUpdate] = useState(getUsersByStatus(users));

    useEffect(() => {
        setUsersUpdate(getUsersByStatus(users));
    }, [users])

    function onDragEnd(result) {
        const { source, destination, draggableId, } = result;

        // dropped outside the list
        if (!destination) {
            return;
        }
        const sInd = +source.droppableId;
        const dInd = +destination.droppableId;

        if (sInd === dInd) {
            let newUsers = [...usersUpdate];
            let indexDropSource = newUsers.findIndex(c => c.status === sInd);
            if (indexDropSource < 0) return;

            const itemDropSource = reorder(newUsers[indexDropSource], source.index, destination.index);
            newUsers[indexDropSource] = itemDropSource;

            setUsersUpdate(newUsers);
        } else {
            let newUsers = [...usersUpdate];

            let indexDropSource = newUsers.findIndex(c => c.status === sInd);
            if (indexDropSource < 0) return;

            let indexDropDestination = newUsers.findIndex(c => c.status === dInd);
            if (indexDropDestination < 0) return;

            const result = move(newUsers[indexDropSource], newUsers[indexDropDestination], source, destination, indexDropSource, indexDropDestination);

            newUsers[indexDropSource] = result[indexDropSource];
            newUsers[indexDropDestination] = result[indexDropDestination];

            handleChangeStatusUser({
                uuid: draggableId,
                status: dInd,
                indexDestination: destination.index,
            })
        }
    }

    return (
        <div>
            <div style={{ display: "flex" }}>
                <DragDropContext
                    onDragEnd={onDragEnd}
                >
                    {
                        usersUpdate.map((el, ind) => (
                            <div className="text-center">
                                <h6 className="user-status">{el.statusName}</h6>
                                <Droppable
                                    key={el.status}
                                    droppableId={`${el.status}`}
                                >
                                    {(provided, snapshot) => (
                                        <div
                                            ref={provided.innerRef}
                                            style={getListStyle(snapshot.isDraggingOver)}
                                            {...provided.droppableProps}
                                        >
                                            {el.users.map((item, index) => (
                                                <Draggable
                                                    key={item.uuid}
                                                    draggableId={item.uuid}
                                                    draggableStatus={item.status}
                                                    index={index}
                                                >
                                                    {(provided, snapshot) => (
                                                        <div
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            style={getItemStyle(
                                                                snapshot.isDragging,
                                                                provided.draggableProps.style
                                                            )}
                                                        >
                                                            <div className="user"
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "space-around"
                                                                }}
                                                            >
                                                                <span>{item.name}</span>
                                                                <div>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleEditUser(item)}
                                                                    >
                                                                        edit
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleDeleteUser(item.uuid)}
                                                                    >
                                                                        delete
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Draggable>
                                            ))}
                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Droppable>
                            </div>
                        ))}
                </DragDropContext>
            </div>
        </div>
    );
}

export default Work;