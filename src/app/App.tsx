import { Suspense, lazy, useEffect, useState, } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppStl.css';

import Header from '../pages/Header';
import { useSelector } from 'react-redux'

import { AppStateType } from '../entities/Store/store';
import { BoardArrType } from '../entities/BoardsR/BoardsReducerTs.interface';


const Registration = lazy(() => import("../pages/Register"))
const UserComp = lazy(() => import('../pages/User'))
const Boards = lazy(() => import('../pages/Boards'))
const BoardsItems = lazy(() => import('../pages/BoardsItems'))



function App() {

    const currentBoardInd = useSelector((state: AppStateType) => state.boardsReducer.currentProjectIndx)
    const boardArrComp = useSelector((state: AppStateType) => state.boardsReducer.projectArr[currentBoardInd].boardArr)

    const [changeBoard, setChangeBoard] = useState<Array<BoardArrType>>(boardArrComp)

    console.log(changeBoard)

    const [localStorageHook, setLocalStorageHook] = useState<boolean>(false)

    useEffect(() => {

        if (localStorage.getItem('user')) {
            setLocalStorageHook(true)
        }
    }, [localStorageHook])


    useEffect(() => {
        setChangeBoard(boardArrComp)
    }, [boardArrComp])


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



                                <Route path='/currentBoard/:id' element={<BoardsItems changeBoard={changeBoard} setChangeBoard={setChangeBoard} boardArr={boardArrComp} />} />

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

