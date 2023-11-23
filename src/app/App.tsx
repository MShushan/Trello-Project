import { Suspense, lazy, useEffect, useState, } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppStl.css';

import Header from '../pages/Header';
import { auth } from '../firebase';
import { Provider, useSelector } from 'react-redux'

import { v4 as uuidv4 } from 'uuid';
import { store } from '../entities/Store/store';


const Registration = lazy(() => import("../pages/Register"))
const UserComp = lazy(() => import('../pages/User'))
const Boards = lazy(() => import('../pages/Boards'))
const BoardsItems = lazy(() => import('../pages/BoardsItems'))



function App() {


    let boardArr: Array<BoardArrType> = [
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
                            date: ''
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
                            date: ''
                        },
                        {
                            id: 1,
                            title: 'thidcomm',
                            name: '',
                            date: ''
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
                            date: ''
                        }
                    ],
                    boardName: 'done',

                },
            ]

        },
    ]

    const [changeBoard, setChangeBoard] = useState<Array<BoardArrType>>(boardArr)



    const [localStorageHook, setLocalStorageHook] = useState<boolean>(false)

    useEffect(() => {

        if (localStorage.getItem('user')) {
            setLocalStorageHook(true)
        }
    }, [localStorageHook])



    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>

                <div className="App">

                    {
                        localStorageHook
                            ?
                            <Header setLocalStorageHook={setLocalStorageHook} />
                            :
                            <Registration setLocalStorageHook={setLocalStorageHook} />
                    }


                    {
                        localStorageHook
                            ?

                            <Routes>



                                <Route path='/currentBoard' element={<BoardsItems changeBoard={changeBoard} setChangeBoard={setChangeBoard} boardArr={boardArr} />} />

                                <Route path='/boards' element={<Boards />} />

                                <Route path='/' element={<UserComp />} />


                            </Routes>
                            :
                            null

                    }



                </div>




            </Suspense>
        </BrowserRouter >
    );
}

export default App;


export interface ItemsObjType {
    id: string,
    title: string,
    comments: Array<ItemsInnerType>,
    boardName: string
}


export interface ItemsInnerType {
    id: number,
    title: string,
    name: string,
    date: string
}


export interface BoardArrType {
    id: number,
    title: string,
    boardName: string,
    items: Array<ItemsObjType>
}
