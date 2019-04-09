export const ADD_TODO = 'ADD_TODO';
export const COMPLETE_TODO = 'COMPLETE_TODO';
export const SET_FILTER = 'SET_FILTER';

export const addTodo = (content) => {
    return {
        type: ADD_TODO,
        content
    }
}

export const filterToggle = (showCompleted: boolean) => {
    return {
        // implement
    }
}

export const completeTodo = (todoId: number) => {
    return {
        // implement
    }
}
