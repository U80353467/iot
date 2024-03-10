package com.example.lot.mapper;


import com.example.lot.model.Message;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Options;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;
@Mapper
public interface MessageMapper {
    @Insert("insert into message " +
            "(clientId, info, value, alert, lng, lat, timestamp) " +
            "values (#{message.clientId}, #{message.info}, #{message.value}, #{message.alert}, #{message.lng}, #{message.lat}, #{message.timestamp})")
    @Options(useGeneratedKeys = true, keyProperty = "message.logId")
    int insertMessage(Message message);

    @Select("select * from message where clientId = #{clientId} order by timestamp desc limit 20")
    List<Message> getAllMessagesByDevice(String clientId);

    @Select("select count(*) as count from message where clientId = #{clientId}")
    int getAllMessagesCountByDevice(String clientId);

    @Select("select clientId, count(*) as count " +
            "from message where timestamp > #{timestamp} group by clientId")
    List<Map<String, Object>> getActiveMessagesCount(long timestamp);

    @Select("select timestamp, value from message where clientId = #{clientId} order by timestamp desc limit 20")
    List<Map<String, Object>> getDeviceValue(String clientId);

    @Select("select timestamp, info from message where clientId = #{clientId} order by timestamp desc limit 20")
    List<Map<String, Object>> getDeviceInfo(String clientId);

    @Select("select lng, lat, alert from message where clientId = #{clientId} order by timestamp desc limit 20")
    List<Map<String, Object>> getDevicePosition(String clientId);
}
