import React from "react";
import { Menu, Button, Layout } from "antd";
import { Link } from "react-router-dom";
import "./MainLayout.css";
import { DesktopOutlined, PieChartOutlined, EnvironmentOutlined, UserOutlined, HomeOutlined, LineChartOutlined, LogoutOutlined } from '@ant-design/icons';

const { Sider } = Layout;

const MainMenu = () => {
    const loginOut = () => {
        localStorage.clear();
        window.location.href = "/login";
    }

    return (
        <Sider className="main-menu" theme="dark" width={200}>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
                <Menu.Item key="1" icon={<HomeOutlined />}>
                    <Link to="/main/home">主页</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                    <Link to="/main/user/info">用户信息</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<DesktopOutlined />}>
                    <Link to="/main/device/config">设备配置</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<PieChartOutlined />}>
                    <Link to="/main/device/statistics">数据统计</Link>
                </Menu.Item>
                <Menu.Item key="5" icon={<LineChartOutlined />}>
                    <Link to="/main/device/value">数据报表</Link>
                </Menu.Item>
                <Menu.Item key="6" icon={<EnvironmentOutlined />}>
                    <Link to="/main/device/map">设备地图</Link>
                </Menu.Item>
                <Menu.Item key="7" icon={<LogoutOutlined />}>
                    <Button type="primary" onClick={loginOut}>退出登录</Button>
                </Menu.Item>
            </Menu>
        </Sider>
    );
}

export default MainMenu;