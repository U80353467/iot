package com.example.lot.mapper;

import com.example.lot.model.Device;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Mapper
public interface DeviceMapper {
    @Insert("insert into device " +
            "(deviceName, description, deviceType, userid) " +
            "values (#{deviceName}, #{description}, #{deviceType}, #{userid})")
    @Options(useGeneratedKeys = true, keyProperty = "deviceId")
    int insertDevice(Device device);

    @Delete("delete from device where deviceName = #{deviceName}")
    int deleteDevice(String deviceName);

    @Select("select * from device where deviceName = #{deviceName}")
    Device getDeviceByName(String deviceName);

    @Select("select count(*) from device where userid = #{userid}")
    int getAllDevicesCount(String userid);

    @Select("select * from device where userid = #{userid}")
    List<Device> getAllDevices(String userid);

    @Select("select deviceType, count(*) as count " +
            "from device where userid = #{userid} group by deviceType")
    List<Map<String, Object>> getDeviceCountByType(String userid);

    @Update("update device set description = #{description}, deviceType = #{deviceType} where deviceName = #{deviceName}")
    int changeInformation(Device device);
}
