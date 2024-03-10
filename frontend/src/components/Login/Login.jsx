import React, { useState } from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import axios from "axios";

const server = "http://localhost:8080";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const navigate = useNavigate();

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        axios
            .post(server + "/user/login", {
                username: values.username,
                password: values.password,
            })
            .then((res) => {
                console.log(res);
                if (res.data.status > 0) {
                    const token = res.data.token;
                    const time = res.data.time;
                    localStorage.setItem("user", values.username);
                    localStorage.setItem("token", token);
                    localStorage.setItem("time", time);
                    alert("登录成功!");
                    navigate('/main/home');
                } else if (res.data.status === -1) {
                    alert("不存在的用户名!");
                } else if (res.data.status === -2) {
                    alert("密码错误!");
                } else {
                    throw new Error("未知错误!");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toRegister = () => {
        navigate('/register');
    };

    return (
        <div className="login">
            <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
            >
                <h1>登录</h1>
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "请输入用户名!",
                        },
                    ]}
                >
                    <Input
                        prefix={<UserOutlined className="site-form-item-icon" />}
                        placeholder="用户名"
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "请输入密码!",
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="密码"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </Form.Item>
                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        className="login-form-button"
                        style={{ marginBottom: "10px" }}
                        form="normal_login"
                    >
                        登录
                    </Button>
                    <Button
                        type="primary"
                        className="login-form-change-button"
                        onClick={toRegister}
                    >
                        注册
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Login;