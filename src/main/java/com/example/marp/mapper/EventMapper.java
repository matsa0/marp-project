package com.example.marp.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import com.example.marp.dto.EventDTO;
import com.example.marp.model.Event;

@Mapper
public interface EventMapper {
    public EventMapper INSTANCE = Mappers.getMapper(EventMapper.class);
    
    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "date", target = "date")
    public EventDTO eventToEventDTO(Event event);
}
