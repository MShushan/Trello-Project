import { Suspense, lazy, useEffect, useState, } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppStl.css';

import Header from '../pages/Header';
import { auth } from '../firebase';


const Registration = lazy(() => import("../pages/Register"))
const UserComp = lazy(() => import('../pages/User'))
const Boards = lazy(() => import('../pages/Boards'))
const BoardsItems = lazy(() => import('../pages/BoardsItems'))



function App() {
    
    
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



                                <Route path='/currentBoard' element={<BoardsItems />} />

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