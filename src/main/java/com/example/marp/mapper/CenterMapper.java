package com.example.marp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.marp.dto.CenterDTO;
import com.example.marp.model.Center;

@Mapper
public interface CenterMapper {
    public CenterMapper INSTANCE = Mappers.getMapper(CenterMapper.class);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "password", target = "password")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "sensors", target = "sensors")
    @Mapping(source = "events", target = "events")
    public CenterDTO centerToCenterDTO(Center center);
}
