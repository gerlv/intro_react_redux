import React, { Component } from 'react';
import './App.css';

let todoId = 0;

interface TodoInterface {
  content: string;
  todoId: number;
  completed: boolean;
}

interface StateInterface {
  todos: TodoInterface[];
  showHidden: boolean;
}

const Toggle = ({ visible, toggle }) => {
  return (
    <div>
      <button onClick={toggle}>
        {visible ?  `Hide` : `Show`} completed
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

class App extends Component<{}, StateInterface> {
  constructor(props: {}) {
    super(props);

    this.state = {
      todos: [],
      showHidden: false
    }
  }

  addTodo = (content, callback) => {
    const { todos } = this.state;

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
      showHidden: !this.state.showHidden
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <Toggle visible={this.state.showHidden} toggle={this.toggleFilter} />
          <AddTodoComponent addTodo={this.addTodo} />
          <TodosList todos={this.state.todos} />
        </div>
      </div>
    );
  }
}

export default App;
