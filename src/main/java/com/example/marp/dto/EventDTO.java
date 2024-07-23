package com.example.marp.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "date"})
public record EventDTO(
    Long id,
    String name,
    LocalDateTime date
) {
} 
