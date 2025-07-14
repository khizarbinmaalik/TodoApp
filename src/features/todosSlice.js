import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    todos: []
};

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodos(state, action) {
            state.todos.push(...action.payload);
        },
        toggleTodo(state, action) {
            const todo = state.todos.find(todo => todo.id === action.payload);
            if (todo) {
                todo.completed = !todo.completed;
            }
        },

        deleteTodo(state, action) {
            state.todos = state.todos.filter(todo => todo.id !== action.payload);
        }
    }
});

export const { addTodo, toggleTodo, deleteTodo } = todosSlice.actions;
const todosReducer = todosSlice.reducer;
export default todosReducer;