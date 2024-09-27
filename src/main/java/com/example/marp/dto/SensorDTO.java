package com.example.marp.dto;

import java.util.List;

import com.example.marp.model.Event;
import com.example.marp.model.enums.SensorStatus;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "status"})
public record SensorDTO(
    Long id,
    String name,
    SensorStatus status,
    List<Event> events
) {
    
}
