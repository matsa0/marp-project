package com.example.marp.dto;

import java.util.List;

import com.example.marp.model.Event;
import com.example.marp.model.Sensor;
import com.example.marp.model.enums.CentralStatus;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "password", "status", "sensors", "events"})
public record CenterDTO(
    Long id,
    String name,
    String password,
    CentralStatus status,
    List<Sensor> sensors,
    List<Event> events
) {
    
}
