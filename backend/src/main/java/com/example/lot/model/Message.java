package com.example.lot.model;

public class Message {
    private int logId;
    private String clientId;
    private String info;
    private int value;
    private int alert;
    private double lng;
    private double lat;
    private long timestamp;

    public int getLogId() {
        return logId;
    }

    public String getClientId() {
        return clientId;
    }

    public String getInfo() {
        return info;
    }

    public int getValue() {
        return value;
    }

    public int getAlert() {
        return alert;
    }

    public double getLng() {
        return lng;
    }

    public double getLat() {
        return lat;
    }

    public long getTimestamp() { return timestamp; }

    public void setLogId(int id) {
        this.logId = id;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public void setInfo(String info) {
        this.info = info;
    }

    public void setValue(int value) {
        this.value = value;
    }

    public void setAlert(int alert) {
        this.alert = alert;
    }

    public void setLng(double longitude) {
        this.lng = longitude;
    }

    public void setLat(double latitude) { this.lat = latitude; }

    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
