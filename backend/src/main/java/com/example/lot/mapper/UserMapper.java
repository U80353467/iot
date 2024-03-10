package com.example.lot.mapper;

import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import com.example.lot.model.User;

import java.util.List;

@Mapper
public interface UserMapper {
    @Insert("insert into user (username, password, email, role) values (#{username}, #{password}, #{email}, #{role})")
    @Options(useGeneratedKeys = true, keyProperty = "userid")
    int insertUser(User user);

    @Select("select * from user where username = #{username}")
    User getUserByName(String username);

    @Select("select * from user where email = #{email}")
    User getUserByEmail(String email);

    @Select("select * from user")
    List<User> getAllUsers();

    @Update("update user set password = #{password} where username = #{username}")
    int changePassword(User user);

    @Update("update user set email = #{email} where username = #{username}")
    int changeInfo(User user);
}
