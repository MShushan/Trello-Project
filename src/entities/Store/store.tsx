import { configureStore } from '@reduxjs/toolkit'
import boardsItemsReducerSlice from '../BoardsItemsR/BoardsItemsReducer'
import boardsReducerSlice from '../BoardsR/BoardsReducer'
import userReducerSlice from '../UserR/UserReducer'




export const store = configureStore({
    reducer: {
        boardsItemsReducer: boardsItemsReducerSlice,
        boardsReducer: boardsReducerSlice,
        userReducer: userReducerSlice
    }
})