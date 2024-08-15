package com.example.marp.dto;

import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "email", "password"})
public record UserDTO(
    Long id,
    String name,
    String email,
    String password
) {
} 