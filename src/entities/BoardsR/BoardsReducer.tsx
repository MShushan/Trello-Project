import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InitialStateType = {}


export const boardsReducerSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {}
})


export default boardsReducerSlice.reducer


interface InitialStateType { }
