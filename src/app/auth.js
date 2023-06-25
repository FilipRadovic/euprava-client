import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    token: '',
    user: {
        username: '',
        firstname: '',
        lastname: '',
        email: '',
        role: ''
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.token = action.payload.authorisation.token;
            state.user = {
                ...action.payload.user
            }
        },
        logout: () => {
            return initialState;
        }
    }
})

export const { login, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;

export default authSlice.reducer;