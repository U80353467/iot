package com.example.lot.model;

public class Device {
    private int deviceId;
    private String deviceName;
    private String description;
    private String deviceType;
    private String userid;

    public Device() {
    }

    public int getDeviceId() {
        return deviceId;
    }

    public String getDeviceName() {
        return deviceName;
    }

    public String getDescription() {
        return description;
    }

    public String getDeviceType() {
        return deviceType;
    }

    public String getUserid() {
        return userid;
    }

    public void setDeviceId(int id) {
        this.deviceId = id;
    }

    public void setDeviceName(String name) {
        this.deviceName = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDeviceType(String type) {
        this.deviceType = type;
    }

    public void setUserid(String userid) {
        this.userid = userid;
    }

}
