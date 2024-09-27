package com.example.marp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.marp.dto.SensorDTO;
import com.example.marp.model.Sensor;

@Mapper
public interface SensorMapper {
    public SensorMapper INSTANCE = Mappers.getMapper(SensorMapper.class);
    
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "status", target = "status")
    @Mapping(source = "events", target = "events")
    public SensorDTO sensorToSensorDTO(Sensor sensor);
}
