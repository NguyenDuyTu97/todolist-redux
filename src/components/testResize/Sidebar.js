import React from "react";
// import "./Sidebar.css";

function Sidebar({ title, active, onClick, onDragStart }) {
    return (
        <div
            className={`sidebar ${active && "active"}`}
            onClick={onClick}
            draggable
            onDragStart={onDragStart}
        >
            <h2>{title}</h2>
        </div>
    );
}

export default Sidebar;
