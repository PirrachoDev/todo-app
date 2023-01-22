import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { v4 as uuid } from 'uuid';
import './TodoList.css';

class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: []
        }
        this.handleAddTodo = this.handleAddTodo.bind(this);
        this.handleRemoveTodo = this.handleRemoveTodo.bind(this);
        this.handleUpdateTodo = this.handleUpdateTodo.bind(this);
        this.handleCompletion = this.handleCompletion.bind(this);

        this.saveToLocalStorage = this.saveToLocalStorage.bind(this);
        this.getLocalStorage = this.getLocalStorage.bind(this);
    }

    handleAddTodo(todo) {
        let newTodo = { ...todo, id: uuid(), completed: false };
        this.setState(
            currentState => ({
                todos: [...currentState.todos, newTodo]
            })
        )
    }

    saveToLocalStorage(){
        let todos = localStorage.getItem('todos');
        if (todos){
            if(window.confirm("This will override your previous saved list. Are you sure you want to continue?")){
                return localStorage.setItem('todos', JSON.stringify(this.state.todos));
            }
        } else {
            localStorage.setItem('todos', JSON.stringify(this.state.todos));
        }
        
    }
    getLocalStorage(){
        let todos = localStorage.getItem('todos');
        if (todos) {
            this.setState({
                todos: JSON.parse(todos)
            })
        }
    }

    handleUpdateTodo(id, updatedTodoText) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, todoText: updatedTodoText } //cada todo del map() tiene id y todoText, aqui se estan manteniendo los otras propiedades del todo en question y solamente se modifica o override el todoText
            }
            return todo
        })
        this.setState({
            todos: updatedTodos
        })
    }

    handleCompletion(id) {
        const updatedTodos = this.state.todos.map(todo => {
            if (todo.id === id) {
                return { ...todo, completed: !todo.completed }
            }
            return todo
        })
        this.setState({
            todos: updatedTodos
        })
    }

    handleRemoveTodo(id) {
        this.setState(
            currentState => ({
                todos: currentState.todos.filter(
                    todo => todo.id !== id
                )
            })
        )
    }

    render() {
        return (
            <div className='TodoList'>
                <h1>ToDo List <span>A Simple React ToDo list App</span></h1>
                <NewTodoForm 
                    addTodo={this.handleAddTodo} 
                    save={this.saveToLocalStorage}
                    restore={this.getLocalStorage}
                />
                <div>
                    <ul>
                        {this.state.todos.map(
                            todo => <Todo
                                updateTodo={this.handleUpdateTodo}
                                removeTodo={this.handleRemoveTodo}
                                toggleCompletion={this.handleCompletion}
                                key={todo.id} id={todo.id}
                                todoText={todo.todoText}
                                completed={todo.completed}
                            />
                        )}
                    </ul>
                </div>
            </div>
        )
    }
}

export default TodoList;