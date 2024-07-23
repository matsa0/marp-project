package com.example.marp.dto;

import com.example.marp.model.enums.SensorStatus;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "status"})
public record SensorDTO(
    Long id,
    String name,
    SensorStatus status
) {
    
}
