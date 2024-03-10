package com.example.lot.controller;

import com.example.lot.model.Device;
import com.example.lot.service.DeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/device")
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @GetMapping("/get/{devicename}")
    public Device getDevice(@PathVariable String devicename) {
        return deviceService.getDeviceByName(devicename);
    }

    @GetMapping("/get/{username}/count/all")
    public int getAllDevicesCount(@PathVariable String username) {
        return deviceService.getAllDevicesCount(username);
    }

    @GetMapping("/get/{username}/list")
    public List<Device> getAllDevices(@PathVariable String username) {
        return deviceService.getAllDevices(username);
    }

    @GetMapping("/get/{username}/count/type")
    public List<Map<String, Object>> getDeviceCountByType(@PathVariable String username) {
        return deviceService.getDeviceCountByType(username);
    }

    @PostMapping("/change/information")
    public int changeDescription(@RequestBody Device device) {
        return deviceService.changeInformation(device);
    }

    @PostMapping("/create")
    public int createDevice(@RequestBody Device device) {
        return deviceService.createDevice(device);
    }

    @PostMapping("/delete")
    public int deleteDevice(@RequestBody String devicename) {
        return deviceService.deleteDevice(devicename);
    }

}
