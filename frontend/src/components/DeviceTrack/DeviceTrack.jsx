import React from "react";
import { Breadcrumb, Layout } from "antd";
import { PageHeader } from "@ant-design/pro-layout";
import DeviceMap from "./DeviceMap"
import "../MainLayout/MainLayout.css"

const { Content } = Layout;

const DeviceTrack = () => {
    return (
        <Layout className="site-layout">
            <Breadcrumb style={{ margin: '16px 0' }} items={[
                { title: "设备" },
                { title: "设备轨迹" }
            ]}>
            </Breadcrumb>
            <Content style={{ padding: "0 50px" }}>
                <div className="site-layout-content">
                    <PageHeader
                        className="site-page-header"
                        title={<span className="custom-page-header-title">设备轨迹</span>}
                        subTitle={<span className="custom-page-header-title">查看设备轨迹、告警信息以及其发布的消息</span>}
                    />
                    <DeviceMap />
                </div>
            </Content>
        </Layout>
    )
}

export default DeviceTrack;