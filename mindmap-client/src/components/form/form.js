import React, {Component} from "react";
import DynamicInput from './dynamicInput';

import classes from './form.module.css'
import axios from "../../axios-instance";


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

    keyPressedInDynamicInput = (event) => {
        if (event.key === 'Enter') {
            this.addInput()
        }
    }

    fetchFirstWordSuggestions = (event) => {
        const data = {word: this.state.mainNameInput}
        axios.post('api/get_related_words', data)
            .then((response) => {
                let firstInputData = {};
                response.data.forEach((wordData, i) => firstInputData[i] = wordData.word)
                this.setState({firstChildInputs: {...firstInputData}})
            })
    }

    render() {
        const inputs = this.state.firstChildInputs;
        let inputArray = Object.keys(inputs).map((key) => {
            return <DynamicInput 
                        value={inputs[key]}
                        changed={(event) => this.changeInputOfId(key, event)}
                        addClicked={this.addInput}
                        removeClicked={() => this.removeInput(key)}
                        keyPressed={this.keyPressedInDynamicInput} />
        })

        return (
            <div className={classes.formContainer}>
                <div><p>Keyword:</p></div>
                <input 
                    placeholder="Keyword"
                    className={classes.mainInput}
                    value={this.state.mainNameInput}
                    onChange={(event) => this.changeMainInput(event)}
                    label="MindMap Center"/>
                <button onClick={this.fetchFirstWordSuggestions}>Get Suggestions</button>
                <div>First suggestions:</div>
                {inputArray}
                <button
                    className={classes.submitButton}
                    onClick={() => this.props.submitted(this.state)} >Create Graph!</button>

            </div>
        )
    }
}

export default DynamicForm;