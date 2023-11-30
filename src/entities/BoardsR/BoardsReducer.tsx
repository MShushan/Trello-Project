import { createSlice, current, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { BoardArrType, InitialStateType, ItemsInnerType, ItemsObjType, ProjectBoardArrType, RepliedCommentsType } from "./BoardsReducerTs.interface";
import { v4 as uuidv4 } from 'uuid';
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { AppStateType } from "../Store/store";


export const fetchPosts = createAsyncThunk(
    'boards/fetchPosts',
    async () => {

        const querySnapshot = await getDocs(collection(db, 'board'))

        return querySnapshot.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))
    }
)
export const addProjectFunc = createAsyncThunk(
    'boards/addProjectFunc',
    async (item: ProjectBoardArrType) => {

        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');

        await updateDoc(docRef, {
            projectArr: arrayUnion(item),
        });

        return { ...item }
    }
)

export const getCurrentProjectIndexFunc = createAsyncThunk(
    'boards/getCurrentProjectIndexFunc',
    async (item: { num: string }) => {

        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');

        await updateDoc(docRef, {
            currentProjectIndx: item,
        });

        return { ...item }
    }
)


export const addIssueAFunc = createAsyncThunk(
    'boards/addIssueAFunc',
    async (item: ItemsObjType) => {

        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');



        let projectArrCLone = [...data[0].projectArr]

        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {

                projectArrCLone[i].boardArr.map((val: any) => {

                    if (val.boardName === item.boardName) {

                        val.items.push(item)
                    }
                })

            }
        }

        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }


    }
)

export const addCommentGlbFunc = createAsyncThunk(
    'boards/addCommentGlbFunc',
    async (item: { item: ItemsObjType | null, proj: string, str: string }) => {


        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]

        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {


                projectArrCLone[i].boardArr.map((val) => {
                    if (val.boardName === item.proj) {
                        val.items.map((val1) => {
                            if (val1.id === item.item?.id) {
                                let commentsItem: ItemsInnerType = {
                                    id: val1.comments.length,
                                    title: item.str,
                                    name: item.str,
                                    date: new Date().toISOString().slice(0, 10),
                                    replied: []
                                }
                                val1.comments.push(commentsItem)
                            }
                        })
                    }
                })

            }
        }

        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }
    }
)




export const changeIssueNameAFunc = createAsyncThunk(
    'boards/changeIssueNameAFunc',
    async (item: { val1: ItemsObjType, str: string }) => {

        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]



        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {


                projectArrCLone[i].boardArr.map((val) => {
                    if (val.boardName === item.val1.boardName) {
                        val.items.map((val2) => {
                            if (val2.id === item.val1.id) {
                                val2.title = item.str
                            }
                        })
                    }
                })



            }
        }

        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }
    }
)




export const addCommentFunc = createAsyncThunk(
    'boards/addCommentFunc',
    async (item: { val: ItemsInnerType, str: string, commentsItem: ItemsObjType | null }) => {


        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]

        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {


                projectArrCLone[i].boardArr.map((val) => {
                    if (val.boardName === item.commentsItem?.boardName) {
                        val.items.map((val1) => {
                            val1.comments.map((val2) => {
                                if (val2.title === item.val.title) {
                                    let repliedCommentObj: RepliedCommentsType = {
                                        date: new Date().toISOString().slice(0, 10),
                                        id: val2.replied.length,
                                        text: item.str,
                                    }
                                    val2.replied.push(repliedCommentObj)
                                }
                            })
                        })
                    }
                })


            }
        }

        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }
    }
)

export const removeCommentFunc = createAsyncThunk(
    'boards/removeCommentFunc',
    async (item: { item: ItemsObjType | null, proj: string, str: string, id: number }) => {


        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]



        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {


                projectArrCLone[i].boardArr.map((val) => {
                    if (val.boardName === item.proj) {
                        val.items.map((val1) => {
                            if (val1.id === item.item?.id) {
                                val1.comments.map((val3, ind3) => {
                                    if (val3.id === item.id) {
                                        val1.comments.splice(ind3, 1)
                                    }
                                })
                            }
                        })
                    }
                })

            }
        }

        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }
    }
)


export const createBoard = createAsyncThunk(
    'boards/createBoard',
    async (boardInfo: BoardArrType) => {

        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]



        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {
                projectArrCLone[i].boardArr.push(boardInfo)
            }
            // if (projectArrCLone[i].id === boardInfo.id){

            // }
        }

        // currentProjectInfo.boardArr.push(action.payload)

        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...boardInfo }
    }
)



export const addDescription = createAsyncThunk(
    'boards/addDescription',
    async (item: { item: ItemsObjType | null, str: string }) => {


        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]




        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {
                projectArrCLone[i].boardArr.map((val) => {
                    if (val.boardName === item.item?.boardName) {
                        val.items.map((val1) => {
                            val1.description = item.str
                        })
                    }
                })
            }
        }



        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }
    }
)




export const deleteIssue = createAsyncThunk(
    'boards/deleteIssue',
    async (item: { issueInfo: ItemsObjType }) => {


        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]




        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {
                projectArrCLone[i].boardArr.map((val) => {
                    if (val.boardName === item.issueInfo.boardName) {
                        val.items.map((val1, ind) => {
                            if (val1.id === item.issueInfo.id) {
                                val.items.splice(ind, 1)
                            }
                        })
                    }
                })
            }
        }



        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }
    }
)


export const deleteBoardItem = createAsyncThunk(
    'boards/deleteBoardItem',
    async (item: { val: BoardArrType }) => {


        let collectionRef = await getDocs(collection(db, 'board'))
        let data: any = collectionRef.docs.map((doc: any) => ({ id: doc.id, ...doc.data() }))


        const docRef = doc(db, 'board', 'lEzgbTQdvaY4zvkcmbyf');


        let projectArrCLone: Array<ProjectBoardArrType> = [...data[0].projectArr]



        for (let i in projectArrCLone) {
            if (projectArrCLone[i].id === data[0].currentProjectIndx.num) {
                projectArrCLone[i].boardArr.map((val, ind) => {
                    if (val.boardName === item.val.boardName) {
                        projectArrCLone[i].boardArr.splice(ind, 1)
                    }
                })
            }
        }



        await updateDoc(docRef, {
            projectArr: projectArrCLone,
        });

        return { ...item }
    }
)


const initialState: InitialStateType = {
    projectArr: [],

    currentProjectIndx: { num: '' },
    loading: false,
    error: false

}


export const boardsReducerSlice = createSlice({
    name: 'boards',
    initialState,
    reducers: {
        // addIssueFunc(state: InitialStateType, action: PayloadAction<ItemsObjType>) {

        //     // let currentProjectInfo = state.projectArr[state.currentProjectIndx]


        //     // currentProjectInfo.boardArr.map((val) => {
        //     //     if (val.boardName === action.payload.boardName) {
        //     //         val.items.push(action.payload)
        //     //     }
        //     // })
        // },

        // changeIssueNameFunc(state: InitialStateType, action: PayloadAction<{ val1: ItemsObjType, str: string }>) {

        // let currentProjectInfo = state.projectArr[state.currentProjectIndx]

        // currentProjectInfo.boardArr.map((val) => {
        //     if (val.boardName === action.payload.val1.boardName) {
        //         val.items.map((val2) => {
        //             if (val2.id === action.payload.val1.id) {
        //                 val2.title = action.payload.str
        //             }
        //         })
        //     }
        // })
        // },



        // addCommentFunc(state: InitialStateType, action: PayloadAction<{ val: ItemsInnerType, str: string, commentsItem: ItemsObjType | null }>) {

        //     let currentProjectInfo = state.projectArr[state.currentProjectIndx]

        //     currentProjectInfo.boardArr.map((val) => {
        //         if (val.boardName === action.payload.commentsItem?.boardName) {
        //             val.items.map((val1) => {
        //                 val1.comments.map((val2) => {
        //                     if (val2.title === action.payload.val.title) {
        //                         let repliedCommentObj: RepliedCommentsType = {
        //                             date: new Date().toISOString().slice(0, 10),
        //                             id: val2.replied.length,
        //                             text: action.payload.str,
        //                         }
        //                         val2.replied.push(repliedCommentObj)
        //                     }
        //                 })
        //             })
        //         }
        //     })

        // },

        // addCommentGlbFunc(state: InitialStateType, action: PayloadAction<{ item: ItemsObjType | null, proj: string, str: string }>) {

        // state.projectArr[state.currentProjectIndx].boardArr.map((val) => {
        //     if (val.boardName === action.payload.proj) {
        //         val.items.map((val1) => {
        //             if (val1.id === action.payload.item?.id) {
        //                 let commentsItem: ItemsInnerType = {
        //                     id: val1.comments.length,
        //                     title: action.payload.str,
        //                     name: action.payload.str,
        //                     date: new Date().toISOString().slice(0, 10),
        //                     replied: []
        //                 }
        //                 val1.comments.push(commentsItem)
        //             }
        //         })
        //         console.log(action.payload.item, action.payload.proj, action.payload.str)
        //     }
        // })
        // },


        // addProjectFunc(state: InitialStateType, action: PayloadAction<string>) {
        //     let newProjectInfoClone: ProjectBoardArrType = {
        //         id: state.projectArr.length,
        //         boardArr: [
        //             {
        //                 id: 0,
        //                 title: 'To do',
        //                 boardName: 'todo',
        //                 items: []
        //             },
        //             {
        //                 id: 1,
        //                 title: 'Doing',
        //                 boardName: 'doing',
        //                 items: []

        //             },
        //             {
        //                 id: 2,
        //                 title: 'Done',
        //                 boardName: 'done',
        //                 items: []
        //             },
        //         ],
        //         boardName: action.payload
        //     }
        //     state.projectArr.push(newProjectInfoClone)
        // },

        // getCurrentProjectIndexFunc(state: InitialStateType, action: PayloadAction<number>) {
        //     state.currentProjectIndx = action.payload
        // }

    },

    extraReducers: {
        [fetchPosts.pending as any]: (state) => {
            state.loading = true
        },
        [fetchPosts.fulfilled as any]: (state, action) => {
            state.loading = false
            // debugger
            state.projectArr = action.payload[0].projectArr
            state.currentProjectIndx = action.payload[0].currentProjectIndx

            console.log(current(state))

        },
        [fetchPosts.rejected as any]: (state) => {
            state.loading = false

        },

        // add board


        [createBoard.pending as any]: (state) => {
            state.loading = true
            state.error = false
        },
        [createBoard.fulfilled as any]: (state, action) => {
            state.loading = false
            state.error = false

            // for (let i in state.projectArr) {
            //     if (state.projectArr[i].id === action.payload)
            // }

            // let currentProjectInfo = state.projectArr[state.currentProjectIndx]


            // currentProjectInfo.boardArr.push(action.payload)

            console.log(current(state))

        },
        [createBoard.rejected as any]: (state) => {
            state.loading = false
            state.error = false

        },



        // add issue

        [addIssueAFunc.pending as any]: (state) => {
            state.loading = true
            state.error = false
        },
        [addIssueAFunc.fulfilled as any]: (state, action) => {

            state.loading = false
            state.error = false


            // let currentProjectInfo = state.projectArr[state.currentProjectIndx]


            // currentProjectInfo.boardArr.map((val) => {
            //     if (val.boardName === action.payload.boardName) {
            //         val.items.push(action.payload)
            //     }
            // })

        },
        [addIssueAFunc.rejected as any]: (state) => {
            state.loading = false
            state.error = true
        },


        // changeIssueNameAFunc



        [changeIssueNameAFunc.pending as any]: (state) => {
            state.loading = true
            state.error = false


        },
        [changeIssueNameAFunc.fulfilled as any]: (state, action) => {

            state.loading = false
            state.error = false


            // let currentProjectInfo = state.projectArr[state.currentProjectIndx]

            // currentProjectInfo.boardArr.map((val) => {
            //     if (val.boardName === action.payload.val1.boardName) {
            //         val.items.map((val2) => {
            //             if (val2.id === action.payload.val1.id) {
            //                 val2.title = action.payload.str
            //             }
            //         })
            //     }
            // })

        },
        [changeIssueNameAFunc.rejected as any]: (state) => {
            state.loading = false
            state.error = true

        },




        // addCommentFunc function

        [addCommentFunc.pending as any]: (state) => {
            state.loading = false
            state.error = false


        },
        [addCommentFunc.fulfilled as any]: (state, action: PayloadAction<{ val: ItemsInnerType, str: string, commentsItem: ItemsObjType | null }>) => {

            state.loading = false
            state.error = false

            // let currentProjectInfo = state.projectArr[state.currentProjectIndx]

            // currentProjectInfo.boardArr.map((val) => {
            //     if (val.boardName === action.payload.commentsItem?.boardName) {
            //         val.items.map((val1) => {
            //             val1.comments.map((val2) => {
            //                 if (val2.title === action.payload.val.title) {
            //                     let repliedCommentObj: RepliedCommentsType = {
            //                         date: new Date().toISOString().slice(0, 10),
            //                         id: val2.replied.length,
            //                         text: action.payload.str,
            //                     }
            //                     val2.replied.push(repliedCommentObj)
            //                 }
            //             })
            //         })
            //     }
            // })

        },
        [addCommentFunc.rejected as any]: (state) => {
            state.loading = false
            state.error = true

        },



        // addCommentGlbFunc function

        [addCommentGlbFunc.pending as any]: (state) => {
            state.loading = false
            state.error = false


        },
        [addCommentGlbFunc.fulfilled as any]: (state, action: PayloadAction<{ item: ItemsObjType | null, proj: string, str: string }>) => {

            state.loading = false
            state.error = false

            // state.projectArr[state.currentProjectIndx].boardArr.map((val) => {
            //     if (val.boardName === action.payload.proj) {
            //         val.items.map((val1) => {
            //             if (val1.id === action.payload.item?.id) {
            //                 let commentsItem: ItemsInnerType = {
            //                     id: val1.comments.length,
            //                     title: action.payload.str,
            //                     name: action.payload.str,
            //                     date: new Date().toISOString().slice(0, 10),
            //                     replied: []
            //                 }
            //                 val1.comments.push(commentsItem)
            //             }
            //         })
            //         console.log(action.payload.item, action.payload.proj, action.payload.str)
            //     }
            // })
        },
        [addCommentGlbFunc.rejected as any]: (state) => {
            state.loading = false
            state.error = true

        },



        // addProjectFunc function

        [addProjectFunc.pending as any]: (state) => {
            state.loading = false
            state.error = false


        },
        [addProjectFunc.fulfilled as any]: (state, action: PayloadAction<ProjectBoardArrType>) => {

            state.loading = false
            state.error = false

            debugger
            console.log(action.payload)

            // state.projectArr.push(action.payload)
        },
        [addProjectFunc.rejected as any]: (state) => {
            state.loading = false
            state.error = true

        },



        // getCurrentProjectIndexFunc function

        [getCurrentProjectIndexFunc.pending as any]: (state) => {
            state.loading = false
            state.error = false


        },
        [getCurrentProjectIndexFunc.fulfilled as any]: (state, action: PayloadAction<{ num: number }>) => {

            state.loading = false
            state.error = false
            // state.currentProjectIndx = action.payload.num

        },
        [getCurrentProjectIndexFunc.rejected as any]: (state) => {
            state.loading = false
            state.error = true

        },


    }
})


export const { } = boardsReducerSlice.actions

export default boardsReducerSlice.reducer


