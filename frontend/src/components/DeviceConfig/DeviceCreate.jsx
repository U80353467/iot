import React, { useState } from "react";
import { Button, Form, Input, Modal, Select } from "antd";
import { EditOutlined } from "@ant-design/icons";
import axios from "axios";

const { Option } = Select;
const server = "http://localhost:8080";

const DeviceCreate = () => {
    const [visible, setVisible] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [deviceName, setDeviceName] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [description, setDescription] = useState("");
    const [userid, setUserid] = useState("");

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
        createDevice();
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const createDevice = () => {
        let data = {
            deviceName: deviceName,
            description: description,
            deviceType: deviceType,
            userid: localStorage.getItem("user"),
        };
        if (data.deviceName === "") {
            alert("请填写设备名称!");
            return;
        }
        axios
            .post(server + "/device/create", data)
            .then((res) => {
                if (res.data > 0) {
                    alert("创建成功!");
                    window.location.reload();
                } else if (res.data === -1) {
                    alert("不合法的用户!");
                } else if (res.data === -2) {
                    alert("设备名已经被占用!");
                } else {
                    throw new Error("未知错误!");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <Button className="login-form-button" type="primary" onClick={showModal} icon={<EditOutlined />}>
                创建设备
            </Button>
            <Modal title="创建设备" open={visible} onOk={handleOk} confirmLoading={confirmLoading} onCancel={handleCancel} >
                <Form>
                    <Form.Item
                        label="设备名称"
                        name="deviceName"
                        rules={[{ required: true, message: "请输入设备名称!" }]}
                    >
                        <Input onChange={(e) => setDeviceName(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="设备描述"
                        name="description"
                        rules={[{ required: true, message: "请输入设备描述!" }]}
                    >
                        <Input onChange={(e) => setDescription(e.target.value)} />
                    </Form.Item>
                    <Form.Item
                        label="设备类型"
                        name="deviceType"
                        rules={[{ required: true, message: "请输入设备类型!" }]}
                    >
                        <Input onChange={(e) => setDeviceType(e.target.value)} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default DeviceCreate;