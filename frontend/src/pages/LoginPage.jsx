import React from "react";
import LoginForm from "../components/Login/Login";
import img from "../assets/login_image.png";
import "./LoginPage.css";

const LoginPage = () => {
    return (
        <div className="login-page" style={{ backgroundImage: `url(${img})` }}>
            <div className="login-page-right">
                <LoginForm/>
            </div>
        </div>
    );
};

export default LoginPage;