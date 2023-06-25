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

export default authSlice.reducer;