import React, { useState } from "react";
import { Button, Form, Input, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./UserInfo.css";
import axios from "axios";

const server = "http://localhost:8080";

const UserPasswordChange = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

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
            oldPassword: oldPassword,
            newPassword: newPassword,
        };
        if (data.username !== localStorage.getItem("user")) {
            alert("用户名不正确!");
            return;
        }
        axios.post(server + "/user/change/password", data).then((res) => {
            if (res.data > 0) {
                alert("修改成功!");
                window.location.reload();
            } else if (res.data === -1) {
                alert("用户不存在!");
            } else if (res.data === -2) {
                alert("密码错误!");
            } else {
                alert("修改失败");
            }
        });
    };

    return (
        <div>
            <Button type="primary" onClick={showModal}>
                修改密码
            </Button>
            <Modal
                title="修改密码"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
            >
                <Form>
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: "请输入用户名!" }]}
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
                        name="oldPassword"
                        rules={[{ required: true, message: "请输入旧密码!" }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="旧密码"
                            onChange={(e) => {
                                setOldPassword(e.target.value);
                            }}
                        />
                    </Form.Item>
                    <Form.Item
                        name="newPassword"
                        rules={[{ required: true, message: "请输入新密码!" }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="新密码"
                            onChange={(e) => {
                                setNewPassword(e.target.value);
                            }}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default UserPasswordChange;