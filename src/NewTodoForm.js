import React, { Component } from 'react';
import './NewTodoForm.css'

class NewTodoForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todoText: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.todoText !== '') {
            this.props.addTodo(this.state);
            this.setState({
                todoText: ''
            });
        }
    }

    render() {
        return (
            <div>
                <form className='NewTodoForm' onSubmit={this.handleSubmit} >
                    <label htmlFor='todoText'>New Todo: </label>
                    <input type='text' value={this.state.todoText} onChange={this.handleChange} id="todoText" name='todoText' placeholder='New ToDo...' />
                    <button onClick={this.handleSubmit}>Add Todo</button>
                </form>
            </div>
        )
    }
}

export default NewTodoForm;