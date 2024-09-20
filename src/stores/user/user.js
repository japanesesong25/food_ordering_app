import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user:null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            return { user: {isLoggedIn: true, user: state.id}}
        },
        logout: (state, action) => {
            return { user: {isLoggedIn: false, user:null}}
        },
        
    }
})

// export const cartProducts = state => state.cart.products

export const {  login, logout } = userSlice.actions

export default userSlice.reducer