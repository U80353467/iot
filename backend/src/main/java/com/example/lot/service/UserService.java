package com.example.lot.service;

import com.example.lot.model.User;
import com.example.lot.mapper.UserMapper;
import jakarta.annotation.Resources;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@CrossOrigin
@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    public int registerUser(User user) {
        if (userMapper.getUserByName(user.getUsername()) != null) {
            return -1;
        } else if (userMapper.getUserByEmail(user.getEmail()) != null) {
            return -2;
        } else if (user.getPassword().length() < 6 || user.getPassword().length() > 16) {
            return -3;
        } else if (!user.getEmail().matches("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")) {
            return -4;
        } else {
            return userMapper.insertUser(user);
        }
    }

    public int checkLogin(User user) {
        User oldUser = userMapper.getUserByName(user.getUsername());
        if (oldUser == null) {
            return -1;
        } else if (!oldUser.getPassword().equals(user.getPassword())) {
            return -2;
        } else {
            return 1;
        }
    }

    public User getUserByName(String username) {
        return userMapper.getUserByName(username);
    }

    public List<User> getAllUsers() {
        return userMapper.getAllUsers();
    }

    public int changePassword(User user, String newPassword) {
        User oldUser = userMapper.getUserByName(user.getUsername());
        if (oldUser == null) {
            return -1;
        } else if (!oldUser.getPassword().equals(user.getPassword())) {
            return -2;
        } else {
            User newUser = new User();
            newUser.setUsername(user.getUsername());
            newUser.setPassword(newPassword);
            return userMapper.changePassword(newUser);
        }
    }

    public Map<String, Object> changeInfo(User user) {
        Map<String, Object> result = new java.util.HashMap<>();
        boolean flag = false;
        User oldUser = userMapper.getUserByName(user.getUsername());
        if (oldUser == null) {
            result.put("email", -1);
        } else if (!oldUser.getPassword().equals(user.getPassword())) {
            result.put("email", -2);
        } else if (!user.getEmail().matches("^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\\.[a-zA-Z0-9_-]+)+$")) {
            result.put("email", -3);
        } else {
            result.put("email", 1);
            flag = true;
        }
        if (flag) {
            result.put("status", userMapper.changeInfo(user));
        } else {
            result.put("status", -1);
        }
        return result;
    }
}
