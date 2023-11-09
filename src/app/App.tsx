import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './AppStl.css';


const Registration = lazy(() => import("../pages/Register"))


function App() {
    return (
        <BrowserRouter>
            <Suspense fallback={<div>Loading...</div>}>
                <div className="App">

                    <Routes>

                        <Route path='/' element={<Registration />} />

                    </Routes>
                </div>
            </Suspense>
        </BrowserRouter>
    );
}

export default App;