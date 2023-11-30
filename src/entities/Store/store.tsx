import { configureStore } from '@reduxjs/toolkit'
import boardsItemsReducerSlice from '../BoardsItemsR/BoardsItemsReducer'
import boardsReducerSlice from '../BoardsR/BoardsReducer'
import userReducerSlice from '../UserR/UserReducer'
import { useDispatch } from 'react-redux'




export const store = configureStore({
    reducer: {
        boardsItemsReducer: boardsItemsReducerSlice,
        boardsReducer: boardsReducerSlice,
        userReducer: userReducerSlice
    }
})

type RootReducerType = typeof store.getState
export type AppStateType = ReturnType<RootReducerType>

export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch