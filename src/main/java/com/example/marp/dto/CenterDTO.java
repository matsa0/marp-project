package com.example.marp.dto;

import java.util.List;

import com.example.marp.model.Log;
import com.example.marp.model.Sensor;
import com.example.marp.model.enums.CentralStatus;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "password", "status", "sensors", "log"})
public record CenterDTO(
    Long id,
    String name,
    String password,
    CentralStatus status,
    List<Sensor> sensors,
    Log log
) {
    
}
