import React from 'react'

import classes from "./dynamicInput.module.css"

const dynamicInput = (props) => {
    return (
        <div className={classes.inputContainer}>
            <input
                value={props.value}
                onChange={props.changed} />
            <div
                className={classes.addButton}
                onClick={props.addClicked} >+</div>
            <div
                className={classes.deleteButton}
                onClick={props.removeClicked} >-</div>
        </div>
    )
}

export default dynamicInput;