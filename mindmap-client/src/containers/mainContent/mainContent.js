import React from 'react';
import './mainContent.css'

const mainContent = (props) => {
    return (
        <div className="mainContent">
            {props.children}
        </div>
    )
};

export default mainContent;