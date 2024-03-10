import React, { useEffect, useState } from "react";
import {Breadcrumb, Col, Descriptions, Layout, Row} from 'antd';
import { PageHeader } from "@ant-design/pro-layout";
import UserInfoChange from "./UserInfoChange";
import UserPasswordChange from "./UserPasswordChange";
import axios from "axios";
import "../MainLayout/MainLayout.css"

const { Content } = Layout;
const server = "http://localhost:8080";

const UserInfo = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        setTime(localStorage.getItem("time"));
        axios.get(server + "/user/get/" + localStorage.getItem("user"))
            .then((res) => {
                setUsername(res.data.username);
                setEmail(res.data.email);
                setRole(res.data.role);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <Layout className="site-layout">
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>用户</Breadcrumb.Item>
                <Breadcrumb.Item>个人信息</Breadcrumb.Item>
            </Breadcrumb>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <PageHeader
                        className="site-page-header"
                        title={<span className="custom-page-header-title">用户信息查询界面</span>}
                        subTitle={<span className="custom-page-header-title">可以在这里查看你的账户信息或者修改它</span>}
                    />
                    <Descriptions title="用户信息" bordered>
                        <Descriptions.Item label="用户名">{username}</Descriptions.Item>
                        <Descriptions.Item label="邮箱">{email}</Descriptions.Item>
                        <Descriptions.Item label="角色身份">{role}</Descriptions.Item>
                        <Descriptions.Item label="上次登录时间">{time}</Descriptions.Item>
                    </Descriptions>
                    <br />
                    <Row gutter={1}>
                        <Col span={15}>
                            <UserPasswordChange />
                        </Col>
                        <Col span={1}>
                            <UserInfoChange />
                        </Col>
                    </Row>
                </div>
            </Content>
        </Layout>
    );
}

export default UserInfo;