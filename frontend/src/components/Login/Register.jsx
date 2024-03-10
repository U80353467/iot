import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Login.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const server = "http://localhost:8080";

const Register = () => {
    const navigate = useNavigate();
    const [confirmPassword, setConfirmPassword] = useState("");

    const onFinish = (values) => {
        console.log("Received values of form: ", values);
        if (values.password !== confirmPassword) {
            alert("密码和确认密码不匹配!");
            return;
        }
        axios
            .post(server + "/user/register", {
                username: values.username,
                password: values.password,
                email: values.email,
            })
            .then((res) => {
                console.log(res);
                if (res.data > 0) {
                    alert("注册成功!");
                    navigate('/login')
                } else if (res.data === -1) {
                    alert("用户名已存在!");
                } else if (res.data === -2) {
                    alert("密码已存在!");
                } else if (res.data === -3) {
                    alert("密码长度不足6位或超过16位!");
                } else if (res.data === -4) {
                    alert("邮箱格式不合法!");
                } else {
                    throw new Error("未知错误!");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const toLogin = () => {
        navigate('/login');
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
                <h1>注册</h1>
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
                    />
                </Form.Item>
                <Form.Item
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: "请确认密码!",
                        },
                    ]}
                >
                    <Input
                        prefix={<LockOutlined className="site-form-item-icon" />}
                        type="password"
                        placeholder="确认密码"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </Form.Item>
                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: "请输入邮箱!",
                        },
                    ]}
                >
                    <Input
                        prefix={<MailOutlined className="site-form-item-icon" />}
                        placeholder="邮箱"
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
                        注册
                    </Button>
                    <Button
                        type="primary"
                        className="login-form-change-button"
                        onClick={toLogin}
                    >
                        登录
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default Register;