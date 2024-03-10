import React, { useEffect, useState } from "react";
import MainMenu from "../components/MainLayout/MainMenu";
import MainHeader from "../components/MainLayout/MainHeader";
import MainFooter from "../components/MainLayout/MainFooter";
import MainRoute from "../components/MainLayout/MainRoute";
import { Layout } from "antd";
import "./MainLayout.css";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const server = "http://127.0.0.1:8080";

const { Header, Footer, Sider, Content } = Layout;

const MainPage = () => {
    const navigate = useNavigate();
    const [loginVerify, setLoginVerify] = useState(false);

    useEffect(() => {
        axios
            .post(server + "/user/verify", {
                username: localStorage.getItem("user"),
                token: localStorage.getItem("token"),
            })
            .then((res) => {
                const loginVerified = res.data > 0;
                if (!loginVerified) {
                    navigate("/login");
                } else {
                    setLoginVerify(loginVerified);
                }
            });
    }, [loginVerify, navigate]);

    return (
        <div>
            <Layout className="site-layout">
                <Sider className="site-sider" breakpoint="md" collapsedWidth="0">
                    <MainMenu />
                </Sider>
                <Layout>
                    <Header className="site-header">
                        <MainHeader />
                    </Header>
                    <Content className="site-content">
                        <MainRoute />
                    </Content>
                    <Footer className="site-footer">
                        <MainFooter />
                    </Footer>
                </Layout>
            </Layout>
        </div>
    );
};

export default MainPage;