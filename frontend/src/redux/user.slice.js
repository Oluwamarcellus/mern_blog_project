import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    activeUser: null,
}

export const userSlice = createSlice({
    name: 'activeUser',
    initialState,
    reducers: {
        setActiveUser: (state, action) => {
            state.activeUser = action.payload;
        },
        clearActiveUser: (state) => {
            state.activeUser = null;
        },
    }
})

export const { setActiveUser, clearActiveUser } = userSlice.actions;
export default userSlice.reducer;