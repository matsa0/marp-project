package com.example.marp.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "email"})
public record UserDTO(
    Long id,
    String name,
    String email
) {
} 