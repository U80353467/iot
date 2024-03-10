import React, { useEffect, useState } from "react";
import { List, Avatar } from 'antd';
import { Form, Input, Button, Select } from 'antd';
import { Map, Circle, NavigationControl, Polyline, Label } from '@uiw/react-baidu-map';
import axios from "axios";
import avatarimg from "../../assets/OIP-C.jpg"

const { Option } = Select;

const server = "http://127.0.0.1:8080";

const DeviceMap = () => {
    const [isShow, setIsShow] = useState(false);
    const [devicePosition, setDevicePosition] = useState([]);
    const [deviceList, setDeviceList] = useState([]);
    const [deviceInfo, setDeviceInfo] = useState([]);

    useEffect(() => {
        axios.get(server + "/device/get/" + localStorage.getItem("user") + "/list")
            .then((res) => {
                setDeviceList(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        setIsShow(devicePosition.length > 0 && deviceInfo.length > 0);
    }, [devicePosition, deviceInfo]);

    const onFinish = (values) => {
        axios.get(server + "/message/get/device/" + values.deviceName + "/position")
            .then((res) => {
                setDevicePosition(res.data);
                console.log(devicePosition);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(server + "/message/get/device/" + values.deviceName + "/info")
            .then((res) => {
                setDeviceInfo(res.data);
                console.log(deviceInfo);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getDeviceList = () => {
        return deviceList.map(item => (
            <Option value={item.deviceName}>{item.deviceName}</Option>
        ));
    };

    const getCircleFillColor = (alert, index) => {
        if (alert === 1) {
            return "#FF0000";
        }
        if (index === 0) {
            return "#00FF00";
        } else if (index === devicePosition.length - 1) {
            return "#00FF00";
        } else {
            return "#0000FF";
        }
    };

    return (
        <div>
            <Form
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
            >
                <Form.Item
                    label="设备名称"
                    name="deviceName"
                    rules={[{ required: true, message: '请输入设备名称!' }]}
                >
                    <Select>
                        {getDeviceList()}
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        查看地图
                    </Button>
                </Form.Item>
            </Form>
            {isShow && (
                <Map
                    center={{ lng: 120.126291, lat: 30.274653 }}
                    zoom={15}
                    style={{ height: "500px" }}
                >
                    <NavigationControl />
                    {devicePosition.map((item, index) => (
                        <Circle
                            key={index}
                            center={{ lng: item.lng, lat: item.lat }}
                            radius={400} 
                            strokeColor="#000000" 
                            strokeWeight={2} 
                            fillColor={getCircleFillColor(item.alert, index)} 
                            fillOpacity={0.6} 
                        />
                    ))}
                    {devicePosition.map(item => (
                        item.alert && (
                            <Label
                                position={{ lng: item.lng, lat: item.lat }}
                                offset={{ width: 5, height: -10 }}>
                                报警
                            </Label>
                        )
                    )
                    )}
                    {devicePosition.length > 1 && (
                        <Polyline
                            strokeColor="#18a45b"
                            strokeWeight={3}
                            path={devicePosition.map(item => ({ lng: item.lng, lat: item.lat }))}
                        />
                    )}
                </Map>
            )}
            <br />
            {isShow && (
                <List 
                    itemLayout="horizontal"
                    dataSource={deviceInfo}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={<Avatar src={avatarimg} />}
                                title={item.timestamp}
                                description={item.info}
                            />
                        </List.Item>
                    )}>
                </List>
            )}
        </div>
    );
};

export default DeviceMap;