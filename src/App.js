import './App.css';
import {useAuthContext} from "./hooks/useAuthContext";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home";
import Game from "./pages/Game";
import {useLoginAnonim} from "./hooks/useLoginAnonim";
import {useEffect} from "react";

function App() {
    const { isAuthReady } = useAuthContext()
    const { login } = useLoginAnonim()

    // mounted
    useEffect(() => {
        login()
    }, [login])

    return (
            <div className="app">
                {isAuthReady && (
                    <BrowserRouter>
                        <Routes>
                            <Route path={'/'} element={<Home/>}/>
                            <Route path={'/game/:id'} element={<Game/>}/>
                        </Routes>
                    </BrowserRouter>
                )}
            </div>
    );
}

export default App;
