import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import './UserInfo.css'
import axios from "axios";

const server = "http://localhost:8080";

const UserInfoChange = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        changeInfo();
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const changeInfo = () => {
        let data = {
            username: username,
            password: password,
            email: email,
        };
        if (data.username !== localStorage.getItem("user")) {
            alert("用户名不正确!");
            return;
        }
        axios.post(server + "/user/change/info", data).then((res) => {
            if (res.data.status > 0) {
                alert("修改成功!");
                window.location.reload();
            } else {
                if (res.data.email === -1) {
                    alert("用户不存在!");
                } else if (res.data.email === -2) {
                    alert("密码错误!");
                } else if (res.data.email === -3) {
                    alert("邮箱格式不正确!");
                } else {
                    alert("修改失败");
                }
            }
        });
    };

    return (
        <div>
            <Button
                type="primary"
                onClick={showModal}
                style={{ marginLeft: "10px" }}
            >
                修改信息
            </Button>
            <Modal
                title="修改信息"
                open={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
                cancelText="取消"
                okText="确认"
            >
                <Form>
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: "请输入现在的用户名!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined className="site-form-item-icon" />}
                            placeholder="用户名"
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
                                message: "请输入现在的密码!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            onChange={(e) => {
                                setPassword(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: "请输入你的新邮箱!",
                            },
                        ]}
                    >
                        <Input
                            prefix={<MailOutlined className="site-form-item-icon" />}
                            placeholder="邮箱"
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
}

export default UserInfoChange;