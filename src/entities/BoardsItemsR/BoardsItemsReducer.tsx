import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface InitialStateType {

}

const initialState: InitialStateType = {
}


export const boardsItemsReducerSlice = createSlice({
    name: 'boardsItems',
    initialState,
    reducers: {
        // changeIssueInnerIssueSummary(state: InitialStateType, action: PayloadAction<{ str: string, id: string }>) {


        // },
    }
})




export default boardsItemsReducerSlice.reducer






