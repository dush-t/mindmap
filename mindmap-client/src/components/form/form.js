import React, {Component} from "react";
import DynamicInput from './dynamicInput';

import classes from './form.module.css'


class DynamicForm extends Component {
    state = {
        mainNameInput: '',
        firstChildInputs: {
            0: ''
        }
    }

    changeInputOfId = (id, event) => {
        let updatedFcInputs = {...this.state.firstChildInputs};
        updatedFcInputs[id] = event.target.value;
        this.setState({ firstChildInputs: updatedFcInputs })
    }

    addInput = () => {
        let updatedFcInputs = {...this.state.firstChildInputs};
        const keys = Object.keys(updatedFcInputs)
        const key = parseInt(keys[keys.length - 1] + 1)
        updatedFcInputs[key] = ''
        this.setState({ firstChildInputs: updatedFcInputs })
    }

    removeInput = (id) => {
        let updatedFcInputs = {}
        let i = 0;
        Object.keys(this.state.firstChildInputs).forEach((key) => {
            if (parseInt(key) !== parseInt(id)) {
                updatedFcInputs[i] = this.state.firstChildInputs[key]
                i++;
            }
        })
        this.setState({ firstChildInputs: updatedFcInputs })
    }

    changeMainInput = (event) => {
        this.setState({ mainNameInput: event.target.value })
    }

    render() {
        const inputs = this.state.firstChildInputs;
        let inputArray = Object.keys(inputs).map((key) => {
            return <DynamicInput 
                        value={inputs[key]}
                        changed={(event) => this.changeInputOfId(key, event)}
                        addClicked={this.addInput}
                        removeClicked={() => this.removeInput(key)} />
        })

        return (
            <div className={classes.formContainer}>
                <input 
                    className={classes.mainInput}
                    value={this.state.mainNameInput}
                    onChange={(event) => this.changeMainInput(event)}
                    label="MindMap Center"/>
                {inputArray}
                <button
                    className={classes.submitButton}
                    onClick={() => this.props.submitted(this.state)} >Create Graph!</button>

            </div>
        )
    }
}

export default DynamicForm;