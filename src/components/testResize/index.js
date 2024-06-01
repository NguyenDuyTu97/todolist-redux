import React, { useState } from 'react';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

function TestResize(props) {

    const [activeSidebar, setActiveSidebar] = useState(null);

    const handleSidebarClick = (sidebar) => {
        setActiveSidebar(sidebar);
    };

    const handleDragStart = (e, sidebar) => {
        e.dataTransfer.setData("sidebar", sidebar);
    };

    return (
        <div className="app">
            <Sidebar
                title="Sidebar 1"
                active={activeSidebar === "sidebar1"}
                onClick={() => handleSidebarClick("sidebar1")}
                onDragStart={(e) => handleDragStart(e, "sidebar1")}
            />
            <Sidebar
                title="Sidebar 2"
                active={activeSidebar === "sidebar2"}
                onClick={() => handleSidebarClick("sidebar2")}
                onDragStart={(e) => handleDragStart(e, "sidebar2")}
            />
            <MainContent activeSidebar={activeSidebar} />
        </div>
    );
}

export default TestResize;