import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import UserInfo from "../User/UserInfo";
import DeviceConfig from "../DeviceConfig/DeviceInfoChange";
import DeviceTrack from "../DeviceTrack/DeviceTrack";
import DeviceStatistics from "../DeviceStatisticsInfo/StatisticsData";
import HomePage from "../Home/Home";
import DeviceValueReport from "../DeviceValueReport/ValueReport";
import {useLocation} from "react-router";


const MainRoute = () => {
    const location = useLocation();
    const isAllowedPath = (path) => {
        const allowedPaths = [
            "/main",
            "/main/home",
            "/main/user/info",
            "/main/device/config",
            "/main/device/map",
            "/main/device/statistics",
            "/main/device/value"
        ];
        return allowedPaths.includes(path);
    };

    if (!isAllowedPath(location.pathname)) {
        return <Navigate to="/login" />;
    }

    return (
        <Routes>
            <Route path={"/main/home"} element={<HomePage />} />
            <Route path={"/main/user/info"} element={<UserInfo />} />
            <Route path={"/main/device/config"} element={<DeviceConfig />} />
            <Route path={"/main/device/map"} element={<DeviceTrack />} />
            <Route path={"/main/device/statistics"} element={<DeviceStatistics />} />
            <Route path={"/main/device/value"} element={<DeviceValueReport />} />
            <Route path={"/main"} element={<Navigate to="/main/home" />} />
        </Routes>
    );
}

export default MainRoute;