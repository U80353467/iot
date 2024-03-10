package com.example.lot.controller;

import com.example.lot.model.Message;
import com.example.lot.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/message")
public class MessageController {

    @Autowired
    private MessageService messageService;

    @GetMapping("/get/device/{devicename}/count")
    public int getAllMessagesCountByDevice(@PathVariable String devicename) {
        return messageService.getAllMessagesCountByDevice(devicename);
    }

    @GetMapping("/get/device/{devicename}/list")
    public List<Message> getAllMessagesByDevice(@PathVariable String devicename) {
        return messageService.getAllMessagesByDevice(devicename);
    }

    @GetMapping("/get/user/{username}/count")
    public int getAllMessagesCountByUser(@PathVariable String username) {
        return messageService.getAllMessagesCountByUser(username);
    }

    @GetMapping("/get/user/{username}/list")
    public List<Message> getAllMessagesByUser(@PathVariable String username) {
        return messageService.getAllMessagesByUser(username);
    }

    @GetMapping("/get/user/{username}/active/count")
    public List<Map<String, Object>> getActiveMessagesCount(@PathVariable String username) {
        LocalDateTime localDateTime = LocalDateTime.now().minusDays(1);
        return messageService.getActiveMessagesCountByUser(username, localDateTime);
    }

    @GetMapping("/get/device/{devicename}/value")
    public List<Map<String, Object>> getDeviceValue(@PathVariable String devicename) {
        return messageService.getDeviceValue(devicename);
    }

    @GetMapping("/get/user/{username}/value")
    public List<Map<String, Object>> getDeviceValueByUser(@PathVariable String username) {
        return messageService.getDeviceValueByUser(username);
    }

    @GetMapping("/get/device/{devicename}/info")
    public List<Map<String, Object>> getDeviceInfo(@PathVariable String devicename) {
        System.out.println(devicename + " is being queried for info.");
        return messageService.getDeviceInfo(devicename);
    }

    @GetMapping("/get/device/{devicename}/position")
    public List<Map<String, Object>> getDevicePosition(@PathVariable String devicename) {
        System.out.println(devicename + " is being queried for position.");
        return messageService.getDevicePosition(devicename);
    }
}
