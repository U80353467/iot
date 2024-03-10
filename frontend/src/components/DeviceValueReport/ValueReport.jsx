import React from "react";
import { Breadcrumb, Layout } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import ValueGraph from "./ValueGraph";
import "../MainLayout/MainLayout.css";

const { Content } = Layout;

const server = "http://localhost:8080";

const ValueReport = () => {
    return (
        <Layout className="layout">
            <Breadcrumb style={{ margin: "16px 0" }} items={[
                { title: "设备" },
                { title: "设备数据报表" },
            ]}>
            </Breadcrumb>
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content">
                    <PageHeader className="site-page-header"
                                title={<span className="custom-page-header-title">设备数据报表</span>}
                                subTitle={<span className="custom-page-header-title">查看设备数据报表</span>}
                    />
                    <br />
                    <ValueGraph />
                    <br />
                </div>
            </Content>
        </Layout>
    );
};

export default ValueReport;