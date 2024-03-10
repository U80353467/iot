import React, { useEffect, useState } from "react";
import { Statistic, Row, Col, Card, Layout, Breadcrumb } from "antd";
import { CustomerServiceTwoTone, AlertTwoTone, FundTwoTone, FireTwoTone } from "@ant-design/icons";
import axios from "axios";
import { PageHeader } from "@ant-design/pro-layout";
import DeviceTypeDiagram from "./DeviceTypeDiagram";
import "../MainLayout/MainLayout.css"

const { Content } = Layout;
const server = "http://localhost:8080";

const StatisticsData = () => {
    const [deviceCount, setDeviceCount] = useState(0);
    const [messageCount, setMessageCount] = useState(0);

    const [activeDeviceCount, setActiveDeviceCount] = useState(0);
    const [activeMessageCount, setActiveMessageCount] = useState(0);

    useEffect(() => {
        axios.get(server + "/device/get/" + localStorage.getItem("user") + "/count/all")
            .then((res) => {
                setDeviceCount(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(server + "/message/get/user/" + localStorage.getItem("user") + "/count")
            .then((res) => {
                setMessageCount(res.data)
            })
            .catch((err) => {
                console.log(err);
            });

        axios.get(server + "/message/get/user/" + localStorage.getItem("user") + "/active/count")
            .then((res) => {
                setActiveDeviceCount(res.data.length);
                let totalActiveMessage = 0;
                for (let i = 0; i < res.data.length; i++) {
                    totalActiveMessage += res.data[i].count;
                }
                setActiveMessageCount(totalActiveMessage);
            })
            .catch((err) => {
                console.log(err);
            })
    }, []);

    return (
        <Layout className="site-layout">
            <Breadcrumb style={{ margin: '16px 0' }} items={[
                {title:"设备"},
                {title:"数据统计"}
            ]}>
            </Breadcrumb>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <PageHeader
                        className="site-page-header"
                        title={<span className="custom-page-header-title">设备数据统计界面</span>}
                        subTitle={<span className="custom-page-header-title">可以在这里查看设备的数据统计信息</span>}
                    />
                    <Row gutter={5}>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="设备数量"
                                    value={deviceCount}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<CustomerServiceTwoTone />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="消息数量"
                                    value={messageCount}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<AlertTwoTone />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="在线设备数量"
                                    value={activeDeviceCount}
                                    valueStyle={{ color: '#3f8600' }}
                                    prefix={<FundTwoTone />}
                                />
                            </Card>
                        </Col>
                        <Col span={6}>
                            <Card>
                                <Statistic
                                    title="在线消息数量"
                                    value={activeMessageCount}
                                    valueStyle={{ color: '#cf1322' }}
                                    prefix={<FireTwoTone />}
                                />
                            </Card>
                        </Col>
                    </Row>
                    <br/>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                        <DeviceTypeDiagram/>
                    </div>
                    <br/>
                </div>
            </Content>
        </Layout>
    );
};

export default StatisticsData;