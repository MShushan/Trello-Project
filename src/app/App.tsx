import { Suspense, lazy, } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import './AppStl.css';

import { auth } from '../firebase';


const Registration = lazy(() => import("../pages/Register"))
const UserComp = lazy(() => import('../pages/User'))
const Boards = lazy(() => import('../pages/Boards'))
const BoardsItems = lazy(() => import('../pages/BoardsItems'))



function App() {

    // const navigate = useNavigate()

    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="App">

                    {
                        auth.currentUser === null
                            ?
                            <Route path='/' element={<Registration />} />

                            :
                            <Routes>



                                <Route path='/currentBoard' element={<BoardsItems />} />

                                <Route path='/boards' element={<Boards />} />

                                <Route path='/userPage' element={<UserComp />} />



                            </Routes>
                    }



                </div>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;