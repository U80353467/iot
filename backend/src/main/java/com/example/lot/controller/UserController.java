package com.example.lot.controller;

import com.example.lot.model.User;
import com.example.lot.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

@CrossOrigin
@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private StringRedisTemplate stringRedisTemplate;

    @GetMapping("/get/{username}")
    public User getUserByName(@PathVariable String username){
        return userService.getUserByName(username);
    }

    @GetMapping("/get/all")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/verify")
    public int loginVerify(@RequestBody Map<String, String> map) {
        //System.out.println(map.get("username") + " is verifying login information!");
        String username = map.get("username");
        String token = map.get("token");
        if (username == null || token == null) {
            //System.out.println(username + " is not verified!");
            return -1;
        }
        if (Boolean.TRUE.equals(stringRedisTemplate.hasKey(token))) {
            String redisUsername = stringRedisTemplate.opsForValue().get(token);
            if (redisUsername.equals(username)) {
                //System.out.println(username + " is verified!");
                return 1;
            }
        }
        //System.out.println(username + " is not verified!");
        return -1;
    }

    @PostMapping("/login")
    public Map<String, Object> loginUser(@RequestBody User user) {
        System.out.println(user.getUsername() + " is logging in!");
        Map<String, Object> map = new HashMap<>();
        int checkResult = userService.checkLogin(user);
        map.put("status", checkResult);
        if(checkResult > 0) {
            String token = UUID.randomUUID().toString();
            stringRedisTemplate.opsForValue().set(token, user.getUsername());
            stringRedisTemplate.expire(token, 20, TimeUnit.MINUTES);
            map.put("token", token);
            map.put("time", LocalDateTime.now());
        }
        return map;
    }

    @PostMapping("/register")
    public int registerUser(@RequestBody User user) {
        System.out.println(user.getUsername() + " is registering!");
        user.setRole("user");
        return userService.registerUser(user);
    }

    @PostMapping("/change/password")
    public int changePassword(@RequestBody Map<String, String> map) {
        User user = new User();
        user.setUsername(map.get("username"));
        user.setPassword(map.get("oldPassword"));
        System.out.println(user.getUsername() + " is changing password!");
        return userService.changePassword(user, map.get("newPassword"));
    }

    @PostMapping("/change/info")
    public Map<String, Object> changeInfo(@RequestBody User user) {
        return userService.changeInfo(user);
    }

}
