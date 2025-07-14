import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice.js";
import todosReducer from "../features/todosSlice.js";
import themeReducer from "../features/themeSlice.js"
const store = configureStore({
  reducer: {
    auth: authReducer,
    todos: todosReducer,
    theme : themeReducer,
  },
});
export default store;
