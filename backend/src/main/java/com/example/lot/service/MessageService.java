package com.example.lot.service;

import com.example.lot.mapper.DeviceMapper;
import com.example.lot.mapper.MessageMapper;
import com.example.lot.mapper.UserMapper;
import com.example.lot.model.Device;
import com.example.lot.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin
@Service
public class MessageService {

    @Autowired
    DeviceMapper deviceMapper;

    @Autowired
    MessageMapper messageMapper;

    public int getAllMessagesCountByDevice(String devicename) {
        return messageMapper.getAllMessagesCountByDevice(devicename);
    }

    public List<Message> getAllMessagesByDevice(String devicename) {
        return messageMapper.getAllMessagesByDevice(devicename);
    }

    public int getAllMessagesCountByUser(String username) {
        List<Device> devices = deviceMapper.getAllDevices(username);
        int count = 0;
        for (Device device : devices) {
            count += messageMapper.getAllMessagesCountByDevice(device.getDeviceName());
        }
        return count;
    }

    public List<Message> getAllMessagesByUser(String username) {
        List<Device> devices = deviceMapper.getAllDevices(username);
        List<Message> messages = new ArrayList<>();
        for (Device device : devices) {
            messages.addAll(messageMapper.getAllMessagesByDevice(device.getDeviceName()));
        }
        return messages;
    }

    public List<Map<String, Object>> getActiveMessagesCountByUser(String username, LocalDateTime localDateTime) {
        List<Device> devices = deviceMapper.getAllDevices(username);
        long timestamp = localDateTime.atZone(ZoneId.systemDefault()).toInstant().toEpochMilli();
        List<Map<String, Object>> map = messageMapper.getActiveMessagesCount(timestamp);
        List<Map<String, Object>> resultList = new ArrayList<>();
        for (Device device : devices) {
            Map<String, Object> resultMap = new HashMap<>();
            resultMap.put("deviceName", device.getDeviceName());
            resultMap.put("count", 0);
            for (Map<String, Object> m : map) {
                if (m.get("clientId").equals(device.getDeviceName())) {
                    resultMap.put("count", m.get("count"));
                    break;
                }
            }
            resultList.add(resultMap);
        }
        return resultList;
    }

    public List<Map<String, Object>> getDeviceValue(String devicename) {
        return messageMapper.getDeviceValue(devicename);
    }

    public List<Map<String, Object>> getDeviceValueByUser(String username) {
        List<Device> devices = deviceMapper.getAllDevices(username);
        List<Map<String, Object>> values = new ArrayList<>();
        for (Device device : devices) {
            List<Map<String, Object>> value = messageMapper.getDeviceValue(device.getDeviceName());
            for (Map<String, Object> map : value) {
                map.put("deviceName", device.getDeviceName());
                values.add(map);
            }
        }
        return values;
    }

    public List<Map<String, Object>> getDeviceInfo(String devicename) {
        List<Map<String, Object>> info = messageMapper.getDeviceInfo(devicename);
        for (Map<String, Object> map : info) {
            long timestamp = Long.parseLong((String) map.get("timestamp"));
            LocalDateTime localDateTime = LocalDateTime.ofInstant(java.time.Instant.ofEpochMilli(timestamp), java.time.ZoneId.systemDefault());
            map.put("timestamp", localDateTime);
        }
        return info;
    }

    public List<Map<String, Object>> getDevicePosition(String devicename) {
        return messageMapper.getDevicePosition(devicename);
    }
}
