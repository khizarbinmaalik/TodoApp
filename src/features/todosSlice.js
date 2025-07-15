import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todos: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodos(state, action) {
      state.todos = [...action.payload];
    },
    toggleTodo(state, action) {
      const todo = state.todos.find((todo) => todo.$id === action.payload);
      if (todo) {
        todo.completed = !todo.completed;
      }
    },

    deleteTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.$id !== action.payload);
    },

    updateTodo(state, action) {
      const {id, title, description} = action.payload
      state.todos = state.todos.map((todo) =>
        todo.$id === id ? { ...todo, title, description } : todo
      );
    },
    setEmpty(state) {
      state.todos = [];
    }
  },
});

export const { addTodos, toggleTodo, deleteTodo, updateTodo, setEmpty } = todosSlice.actions;
const todosReducer = todosSlice.reducer;
export default todosReducer;
