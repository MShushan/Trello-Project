import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { BoardArrType, InitialStateType, ItemsInnerType, ItemsObjType, ProjectBoardArrType, RepliedCommentsType } from "./BoardsReducerTs.interface";
import { v4 as uuidv4 } from 'uuid';


const initialState: InitialStateType = {
    projectArr: [
        {
            id: 0,
            boardName: 'First board',
            boardArr: [
                {
                    id: 0,
                    title: 'To do',
                    boardName: 'todo',
                    items: [
                        {
                            id: uuidv4(),
                            title: 'first text',
                            comments: [
                                {
                                    id: 0,
                                    title: 'asdfasdf',
                                    name: '',
                                    date: '',
                                    replied: []

                                }
                            ],
                            boardName: 'todo',
                        }
                    ]
                },
                {
                    id: 1,
                    title: 'Doing',
                    boardName: 'doing',
                    items: []

                },
                {
                    id: 2,
                    title: 'Done',
                    boardName: 'done',
                    items: [
                        {
                            id: uuidv4(),
                            title: 'sec text',
                            comments: [
                                {
                                    id: 0,
                                    title: 'seccomment',
                                    name: '',
                                    date: '',
                                    replied: []
                                },
                                {
                                    id: 1,
                                    title: 'thidcomm',
                                    name: '',
                                    date: '',
                                    replied: [
                                        {
                                            id: 0,
                                            text: 'replied comment',
                                            date: ''
                                        },
                                    ]
                                },
                            ],
                            boardName: 'done',

                        },
                        {
                            id: uuidv4(),
                            title: 'third text',
                            comments: [
                                {
                                    id: 0,
                                    title: 'zxcvzxcvvvvvvvvvvvvvvvv',
                                    name: '',
                                    date: '',
                                    replied: []

                                }
                            ],
                            boardName: 'done',

                        },
                    ]

                },
            ]
        }
    ],

    currentProjectIndx: 0

}


export const boardsReducerSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        addIssueFunc(state: InitialStateType, action: PayloadAction<ItemsObjType>) {

            let currentProjectInfo = state.projectArr[state.currentProjectIndx]


            currentProjectInfo.boardArr.map((val) => {
                if (val.boardName === action.payload.boardName) {
                    val.items.push(action.payload)
                }
            })
        },

        changeIssueNameFunc(state: InitialStateType, action: PayloadAction<{ val1: ItemsObjType, str: string }>) {

            let currentProjectInfo = state.projectArr[state.currentProjectIndx]

            currentProjectInfo.boardArr.map((val) => {
                if (val.boardName === action.payload.val1.boardName) {
                    val.items.map((val2) => {
                        if (val2.id === action.payload.val1.id) {
                            val2.title = action.payload.str
                        }
                    })
                }
            })
        },

        addBoardFunc(state: InitialStateType, action: PayloadAction<string>) {

            let currentProjectInfo = state.projectArr[state.currentProjectIndx]

            let newBoarObjClone: BoardArrType = {
                id: currentProjectInfo.boardArr.length,
                title: action.payload,
                boardName: action.payload.toLowerCase(),
                items: []
            }

            currentProjectInfo.boardArr.push(newBoarObjClone)
        },

        addCommentFunc(state: InitialStateType, action: PayloadAction<{ val: ItemsInnerType, str: string, commentsItem: ItemsObjType | null }>) {

            let currentProjectInfo = state.projectArr[state.currentProjectIndx]

            currentProjectInfo.boardArr.map((val) => {
                if (val.boardName === action.payload.commentsItem?.boardName) {
                    val.items.map((val1) => {
                        val1.comments.map((val2) => {
                            if (val2.title === action.payload.val.title) {
                                let repliedCommentObj: RepliedCommentsType = {
                                    date: new Date().toISOString().slice(0, 10),
                                    id: val2.replied.length,
                                    text: action.payload.str,
                                }
                                val2.replied.push(repliedCommentObj)
                            }
                        })
                    })
                }
            })

        },

        addCommentGlbFunc(state: InitialStateType, action: PayloadAction<{ item: ItemsObjType | null, proj: string, str: string }>) {

            state.projectArr[state.currentProjectIndx].boardArr.map((val) => {
                if (val.boardName === action.payload.proj) {
                    val.items.map((val1) => {
                        if (val1.id === action.payload.item?.id) {
                            let commentsItem: ItemsInnerType = {
                                id: val1.comments.length,
                                title: action.payload.str,
                                name: action.payload.str,
                                date: new Date().toISOString().slice(0, 10),
                                replied: []
                            }
                            val1.comments.push(commentsItem)
                        }
                    })
                    console.log(action.payload.item, action.payload.proj, action.payload.str)
                }
            })
        },


        addProjectFunc(state: InitialStateType, action: PayloadAction<string>) {
            let newProjectInfoClone: ProjectBoardArrType = {
                id: state.projectArr.length,
                boardArr: [
                    {
                        id: 0,
                        title: 'To do',
                        boardName: 'todo',
                        items: []
                    },
                    {
                        id: 1,
                        title: 'Doing',
                        boardName: 'doing',
                        items: []

                    },
                    {
                        id: 2,
                        title: 'Done',
                        boardName: 'done',
                        items: []
                    },
                ],
                boardName: action.payload
            }
            state.projectArr.push(newProjectInfoClone)
        },

        getCurrentProjectIndexFunc(state: InitialStateType, action: PayloadAction<number>) {
            state.currentProjectIndx = action.payload
        }

    }
})


export const { addCommentGlbFunc, getCurrentProjectIndexFunc, addProjectFunc, addIssueFunc, changeIssueNameFunc, addBoardFunc, addCommentFunc } = boardsReducerSlice.actions

export default boardsReducerSlice.reducer


