package com.example.marp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.marp.dto.LogDTO;
import com.example.marp.model.Log;

@Mapper
public interface LogMapper {
    public LogMapper INSTANCE = Mappers.getMapper(LogMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "center", target = "center")
    public LogDTO logToLogDTO(Log log);
}
