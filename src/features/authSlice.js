import { createSlice } from "@reduxjs/toolkit";
import { setEmpty } from "./todosSlice";
const initialState = {
    isLoggedIn: false,
    user: null,
};

const authSlice = createSlice({
    name : "auth",
    initialState,
    reducers : {
        login : (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        logout(state)  {
            state.isLoggedIn = false;
            state.user = null;
        }
    }
});

export const { login, logout } = authSlice.actions;
const authReducer = authSlice.reducer;
export default authReducer;