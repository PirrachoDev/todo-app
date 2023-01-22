import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
    // static defaultProps = {
    //     todoText: 'Default text.'
    // }

    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            todoText: this.props.todoText
        }
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleToggleCompletion = this.handleToggleCompletion.bind(this);
    }

    handleRemove() {
        let { id } = this.props;
        this.props.removeTodo(id);
    }

    handleEdit() {
        this.setState(
            currentState => ({
                isEditing: !currentState.isEditing
            })
        )
    }

    handleUpdate(e) {
        e.preventDefault();
        this.props.updateTodo(this.props.id, this.state.todoText);
        this.setState(
            currentState => ({
                isEditing: !currentState.isEditing
            })
        )
    }

    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleToggleCompletion() {
        this.props.toggleCompletion(this.props.id);
    }

    render() {
        let result;
        if (this.state.isEditing) {
            result =
                <div className='Todo'>
                    <form className='Todo-edit-form' onSubmit={this.handleUpdate}>
                        <input
                            type='text'
                            name='todoText'
                            value={this.state.todoText}
                            onChange={this.handleChange}
                            autoFocus={true} />
                        <button>Save</button>
                    </form>
                </div>
        } else {
            result =
                <div className='Todo'>
                    <li className={this.props.completed ? 'Todo-task completed' : 'Todo-task'}
                        onClick={this.handleToggleCompletion} >
                        {this.props.todoText}
                    </li>
                    <div className='Todo-buttons'>
                        <button onClick={this.handleEdit}><i className="bi bi-pencil-fill"></i></button>
                        <button onClick={this.handleRemove}><i className="bi bi-trash3-fill"></i></button>
                    </div>
                </div>
        }
        return result;
    }
}

export default Todo;