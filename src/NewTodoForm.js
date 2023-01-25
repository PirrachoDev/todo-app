import React, { Component } from 'react';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import { Tooltip } from 'react-bootstrap';
import './NewTodoForm.css'

class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleRestore = this.handleRestore.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        if (this.state.todoText !== '') {
            this.props.addTodo(this.state);
            this.setState({
                todoText: ''
            });
        }
    }
    handleSave() {
        this.props.save()
    }
    handleRestore() {
        this.props.restore()
    }

    render() {
        return (
            <div>
                <form className='NewTodoForm' onSubmit={this.handleSubmit} >
                    <label htmlFor='todoText'>New Todo: </label>
                    <input type='text' value={this.state.todoText} onChange={this.handleChange} id="todoText" name='todoText' placeholder='New ToDo...' />
                    <button onClick={this.handleSubmit}>Add Todo</button>
                    <div className='SaveAndShow'>
                        <button onClick={this.handleSave}><i className="bi bi-cloud-upload-fill"></i> Save&nbsp;
                            <OverlayTrigger
                                key={'top'}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Clicking this button will upload your current ToDo list and you can restore it later.
                                    </Tooltip>
                                }>
                                <sup>
                                    <i className="bi bi-info-circle"></i>
                                </sup>
                            </OverlayTrigger>
                        </button>

                        <button onClick={this.handleRestore}><i className="bi bi-cloud-download-fill"></i> restore list&nbsp;
                            <OverlayTrigger
                                key={'top'}
                                placement={'top'}
                                overlay={
                                    <Tooltip id={`tooltip-top`}>
                                        Clicking this button will show your previously saved ToDo list.
                                    </Tooltip>
                                }>
                                <sup>
                                    <i className="bi bi-info-circle"></i>
                                </sup>
                            </OverlayTrigger>
                        </button>
                    </div>
                </form>
            </div>
        )
    }
}

export default NewTodoForm;