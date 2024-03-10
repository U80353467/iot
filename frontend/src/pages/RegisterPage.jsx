import React from "react";
import RegisterForm from "../components/Login/Register";
import img from "../assets/login_image.png";
import "./LoginPage.css";

const RegisterPage = () => {
    return (
        <div className="login-page" style={{ backgroundImage: `url(${img})` }}>
            <div className="login-page-right">
                <RegisterForm/>
            </div>
        </div>
    );
};

export default RegisterPage;