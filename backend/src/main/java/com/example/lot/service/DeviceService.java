package com.example.lot.service;

import com.example.lot.model.User;
import com.example.lot.model.Device;
import com.example.lot.mapper.DeviceMapper;
import com.example.lot.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@CrossOrigin
@Service
public class DeviceService {
    @Autowired
    DeviceMapper deviceMapper;

    @Autowired
    UserMapper userMapper;

    public int createDevice(Device device) {
        User oldUser = userMapper.getUserByName(device.getUserid());
        if (oldUser == null) {
            return -1;
        } else if (deviceMapper.getDeviceByName(device.getDeviceName()) != null) {
            return -2;
        } else {
            if (device.getDescription() == null) {
                device.setDescription(device.getDeviceName());
            }
            if (device.getDeviceType() == null) {
                device.setDeviceType("Unknown");
            }
            return deviceMapper.insertDevice(device);
        }
    }

    public int deleteDevice(String devicename) {
        Device oldDevice = deviceMapper.getDeviceByName(devicename);
        if (oldDevice == null) {
            return -1;
        }
        return deviceMapper.deleteDevice(devicename);
    }

    public Device getDeviceByName(String devicename) {
        return deviceMapper.getDeviceByName(devicename);
    }

    public int getAllDevicesCount(String username) {
        return deviceMapper.getAllDevicesCount(username);
    }

    public List<Device> getAllDevices(String username) {
        return deviceMapper.getAllDevices(username);
    }

    public List<Map<String, Object>> getDeviceCountByType(String username) {
        return deviceMapper.getDeviceCountByType(username);
    }

    public int changeInformation(Device device) {
        Device oldDevice = deviceMapper.getDeviceByName(device.getDeviceName());
        if (oldDevice == null) {
            return -1;
        } else {
            if (device.getDescription() == null) {
                device.setDescription(oldDevice.getDescription());
            }
            if (device.getDeviceType() == null) {
                device.setDeviceType(oldDevice.getDeviceType());
            }
            return deviceMapper.changeInformation(device);
        }
    }

}
