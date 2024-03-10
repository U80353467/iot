import React, { useState, useEffect } from "react";
import { Button, Form, Input, Select, Space, Layout, Breadcrumb } from "antd";
import { EditOutlined, InfoCircleOutlined, InboxOutlined } from "@ant-design/icons";
import DeviceCreateButton from "./DeviceCreate";
import axios from "axios";
import { PageHeader } from "@ant-design/pro-layout";

const { Content } = Layout;
const { Option } = Select;

const server = "http://localhost:8080";

const DeviceInfoChange = () => {
    const [deviceName, setDeviceName] = useState("");
    const [description, setDescription] = useState("");
    const [deviceType, setDeviceType] = useState("");
    const [deviceList, setDeviceList] = useState([]);

    useEffect(() => {
        axios
            .get(server + "/device/get/" + localStorage.getItem("user") + "/list")
            .then((res) => {
                const deviceList = res.data;
                setDeviceList(deviceList);
            });
    }, []);

    const onFinish = () => {
        let data = {
            deviceName: deviceName,
            deviceType: deviceType,
            description: description,
        };
        axios.post(server + "/device/change/info", data).then((res) => {
            if (res.data > 0) {
                alert("修改成功!");
                window.location.reload();
            } else {
                alert("修改失败!");
            }
        });
    };

    const changeInfo = () => {
        let data = {
            deviceName: deviceName,
            description: description,
            deviceType: deviceType,
        };
        if (data.deviceName === "") {
            alert("请填写设备名称!");
            return;
        }
        axios.post(server + "/device/change/information", data).then((res) => {
            if (res.data > 0) {
                alert("修改成功!");
                window.location.reload();
            } else {
                alert("修改失败!");
            }
        });
    };

    const deleteDevice = () => {
        let data = deviceName;
        if (data === "") {
            alert("请填写设备名称!");
            return;
        }
        axios.post(server + "/device/delete", data).then((res) => {
            if (res.data > 0) {
                alert("删除成功!");
                window.location.reload();
            } else if (res.data === -1) {
                alert("不存在的设备名!");
            } else {
                alert("删除失败!");
            }
        })
    }

    return (
        <Layout className="site-layout">
            <Breadcrumb style={{ margin: "16px 0" }} items={[
                { title: "设备" },
                { title: "信息管理" }
            ]}>
            </Breadcrumb>
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content">
                    <PageHeader className="site-page-header"
                                title={<span className="custom-page-header-title">设备配置界面</span>}
                                subTitle={<span className="custom-page-header-title">可以在这里对你的设备进行配置</span>}
                    />
                    <Form>
                        <Form.Item
                            name="deviceName"
                            rules={[
                                {
                                    required: true,
                                    message: "请选择设备"
                                }
                            ]}>
                            <Select
                                suffixIcon={<EditOutlined />}
                                placeholder="设备名称"
                                onChange={(value) => {
                                    setDeviceName(value);
                                }}
                            >
                                {deviceList.map((device) => (
                                    <Option value={device.deviceName} key={device.deviceName}>
                                        {device.deviceName}
                                    </Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<InfoCircleOutlined />}
                                placeholder="设备描述"
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Input
                                prefix={<InboxOutlined />}
                                placeholder="设备类型"
                                onChange={(e) => {
                                    setDeviceType(e.target.value);
                                }}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Space>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={changeInfo} >
                                    修改配置
                                </Button>
                                <Button type="primary" htmlType="submit" className="login-form-button" onClick={deleteDevice} >
                                    删除设备
                                </Button>
                                <DeviceCreateButton />
                            </Space>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
        </Layout>
    );
};

export default DeviceInfoChange;