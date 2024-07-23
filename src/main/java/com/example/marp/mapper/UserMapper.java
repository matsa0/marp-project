package com.example.marp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.marp.dto.UserDTO;
import com.example.marp.model.User;

@Mapper
public interface UserMapper {
    public UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "email", target = "email")
    public UserDTO userToUserDTO(User user);
}
