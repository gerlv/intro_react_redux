import React, { Component } from 'react';
import './App.css';
import { TodoInterface } from './interfaces';
import { connect } from 'react-redux';
import { addTodo } from './actions';

let todoId = 0;

interface StateInterface {
  todos: TodoInterface[];
  showCompleted: boolean;
}

const Toggle = ({ showCompleted, toggle }) => {
  return (
    <div>
      <button onClick={toggle}>
        {showCompleted ?  `Hide` : `Show`} completed
      </button>
    </div>
  );
}

const TodosList = ({todos}) => {
  return (
    <div>
      {todos.map(t => {
        return (
          <div key={t.todoId.toString()}>
            {t.content}
          </div>
        );
      })}
    </div>
  );
}

interface AddTodoProps {
  addTodo: (content: string, callback) => void;
}

class AddTodoComponent extends Component<AddTodoProps> {
  addTodoInput: HTMLInputElement | null = null;

  cleanInput = () => {
    this.addTodoInput!.value = '';
  }

  addTodoCallback = () => {
    this.props.addTodo(this.addTodoInput!.value, this.cleanInput);
  }

  render() {
    return (
      <div>
        <input ref={(e) => this.addTodoInput = e} />
        <button onClick={this.addTodoCallback}>Add</button>
      </div>
    );
  }
}

interface AppProps {
  todos: TodoInterface[];
  addTodo: (content) => void;
}

class App extends Component<AppProps, StateInterface> {
  constructor(props: AppProps) {
    super(props);

    this.state = {
      todos: [],
      showCompleted: false
    }
  }

  addTodo = (content, callback) => {
    const { todos } = this.state;

    this.props.addTodo(content);

    todos.push({
      content,
      todoId: todoId++,
      completed: false
    });

    this.setState({
      todos
    }, callback);
  }

  toggleFilter = () => {
    this.setState({
      showCompleted: !this.state.showCompleted
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Toggle showCompleted={this.state.showCompleted} toggle={this.toggleFilter} />
          <AddTodoComponent addTodo={this.addTodo} />
          <TodosList todos={this.props.todos} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const todos = state.todosReducer.listOfTodos;

  return {
    todos,
    showCompleted: state.todosReducer.showCompleted
  }
};

const mapDispatchToProps = {
  addTodo: addTodo
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
