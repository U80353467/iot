import React from "react";
import { Layout, Breadcrumb } from 'antd';
import "../MainLayout/MainLayout.css"
import { PageHeader } from "@ant-design/pro-layout";
import img from "../../assets/home_img.jpg";

const { Content } = Layout;

const Home = () => {
    return (
        <Layout className="site-layout">
            <Breadcrumb style={{ margin: '16px 0' }} items={[
                { title: "首页" },
                { title: "网站主页" },
            ]}>
            </Breadcrumb>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <PageHeader
                        className="site-page-header"
                        title={<span className="custom-page-header-title">这里是物联网设备管理网站</span>}
                        subTitle={<span className="custom-page-header-title">在左侧菜单栏中选择你要继续执行的操作</span>}
                    />
                    <img src={img} alt="img" />
                </div>
            </Content>
        </Layout>
    );
}

export default Home;