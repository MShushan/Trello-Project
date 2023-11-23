import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateType = {}


export const userReducerSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {}
})


export default userReducerSlice.reducer


interface InitialStateType { }
