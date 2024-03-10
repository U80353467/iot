import logo from './logo.svg';
import './App.css';
import React from 'react';
import { Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage"
import MainPage from "./pages/MainPage"
import RegisterPage from "./pages/RegisterPage";

function App() {
    let isLogin = () => {
        const token = localStorage.getItem("token");
        return token != null;
    }
    return (
        <div className="App">
            <Routes>
                <Route path={'/login'} element={<LoginPage />}/>
                <Route path={'/*'} element={<MainPage />}/>
                <Route path={'/register'} element={<RegisterPage/>} />
                <Route
                    path={'/'}
                    element={isLogin() ? <Navigate to="/main" /> : <Navigate to="/login" />}
                />
            </Routes>
        </div>
    );
}

export default App;
