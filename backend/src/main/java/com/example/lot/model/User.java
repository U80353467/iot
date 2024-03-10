package com.example.lot.model;

public class User {
    private int userid;
    private String username;
    private String password;
    private String email;
    private String role;

    public User() {
    }

    public User(String username, String password, String email, int userid, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.userid = userid;
        this.role = role;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }

    public String getUsername() {
        return username;
    }

    public int getUserid() {
        return userid;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public void setUsername(String name) {
        this.username = name;
    }
    public void setUserid(int id) {
        this.userid = id;
    }
}
