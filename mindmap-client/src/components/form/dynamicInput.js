import React from 'react'

import classes from "./dynamicInput.module.css"

class DynamicInput extends React.Component {
    
    constructor(props) {
        super(props);
        this.textInput = React.createRef();
    }

    componentDidMount() {
        this.textInput.current.focus();
    }

    render() {
        return (
            <div className={classes.inputContainer}>
                <input
                    value={this.props.value}
                    onChange={this.props.changed}
                    onKeyPress={(event) => this.props.keyPressed(event)}
                    ref={this.textInput} />
                <div
                    className={classes.addButton}
                    onClick={this.props.addClicked} >+</div>
                <div
                    className={classes.deleteButton}
                    onClick={this.props.removeClicked} >-</div>
            </div>
        )
    }
}

export default DynamicInput;