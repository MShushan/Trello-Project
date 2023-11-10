import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppStl.css';


const Registration = lazy(() => import("../pages/Register"))
const User = lazy(() => import('../pages/User'))
const Boards = lazy(() => import('../pages/Boards'))
const BoardsItems = lazy(() => import('../pages/BoardsItems'))




function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="App">


                    <Routes>

                        <Route path='/currentBoard' element={<BoardsItems />} />


                        <Route path='/boards' element={<Boards />} />

                        <Route path='/userPage' element={<User />} />

                        <Route path='/' element={<Registration />} />

                    </Routes>
                </div>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;