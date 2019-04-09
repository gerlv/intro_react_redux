import { TodoInterface } from './interfaces';
import { combineReducers } from 'redux'
import { ADD_TODO } from './actions';

interface stateProps {
    listOfTodos: TodoInterface[];
    showCompleted: boolean;
}

const initialTodos = [
    {completed: false, todoId: 0, content: 'Hello'},
    {completed: false, todoId: 1, content: 'world'},
];

let todoId = 2;

const initialState: stateProps = {
    listOfTodos: initialTodos,
    showCompleted: true
}

export const todosReducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_TODO:
            let todos = [...state.listOfTodos];
            
            todos.push({
                content: action.content,
                todoId: ++todoId,
                completed: false
            });

            return {...state, listOfTodos: todos}
        default:
            return state;
    }
}

export const rootReducer = combineReducers({
    todosReducer: todosReducer
})
