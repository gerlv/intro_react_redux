import { TodoInterface } from './interfaces';
import { combineReducers } from 'redux'
import { ADD_TODO } from './actions';

interface stateProps {
    todos: TodoInterface[];
    showCompleted: boolean;
}

const initialTodos = [
    {completed: false, todoId: 0, content: 'Hello'},
    {completed: false, todoId: 1, content: 'world'},
];

let todoId = 2;

const initialState: stateProps = {
    todos: initialTodos,
    showCompleted: true
}

export const todosReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TODO:
            let todos = state.todos;
            
            todos.push({
                content: action.content,
                todoId: ++todoId,
                completed: false
            });

            return {...state, todos}
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    todos: todosReducer
})
