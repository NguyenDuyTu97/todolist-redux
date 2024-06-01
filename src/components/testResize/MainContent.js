import React, { useState } from "react";
import "./MainContent.css";

function MainContent({ activeSidebar }) {
    const [dragging, setDragging] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const sidebar = e.dataTransfer.getData("sidebar");
        console.log("Dropped:", sidebar);
    };

    return (
        <div
            className={`main-content ${dragging && "dragging"}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <h1>Main Content</h1>
            <p>
                {activeSidebar
                    ? `You clicked on ${activeSidebar} sidebar`
                    : "Click on a sidebar"}
            </p>
        </div>
    );
}

export default MainContent;
