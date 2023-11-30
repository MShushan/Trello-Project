import { Suspense, lazy, useEffect, useState, } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppStl.css';

import Header from '../pages/Header';
import { useSelector } from 'react-redux'

import { AppStateType, useAppDispatch } from '../entities/Store/store';
import { BoardArrType } from '../entities/BoardsR/BoardsReducerTs.interface';
import { fetchPosts } from '../entities/BoardsR/BoardsReducer';


const Registration = lazy(() => import("../pages/Register"))
const UserComp = lazy(() => import('../pages/User'))
const Boards = lazy(() => import('../pages/Boards'))
const BoardsItems = lazy(() => import('../pages/BoardsItems'))



function App() {

    const asyncDispatch = useAppDispatch()

    const currentBoardGlb = useSelector((state: AppStateType) => state.boardsReducer)
    const loading = useSelector((state: AppStateType) => state.boardsReducer.loading)





    const [currentBoardInd, setCurrentBoardInd] = useState<string>('')


    // debugger

    const [boardArrComp, setBoardArrComp] = useState<Array<BoardArrType> | null>(null)



    useEffect(() => {
        asyncDispatch(fetchPosts())

    }, [asyncDispatch])


    // useEffect(() => {

    //     debugger

    //     setCurrentBoardInd(currentBoardGlb.currentProjectIndx)


    //     debugger
    //     for (let i in currentBoardGlb.projectArr) {
    //         debugger
    //         if (currentBoardGlb.projectArr[i].id === currentBoardGlb.currentProjectIndx) {
    //             setBoardArrComp(currentBoardGlb.projectArr[i].boardArr)
    //         }
    //     }

    //     // if (!loading && currentBoardGlb.projectArr[currentBoardGlb.currentProjectIndx]) {
    //     //     setBoardArrComp(currentBoardGlb.projectArr[currentBoardGlb.currentProjectIndx].boardArr)

    //     // }



    // }, [currentBoardGlb])




    const [changeBoard, setChangeBoard] = useState<Array<BoardArrType> | null>(boardArrComp)

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

