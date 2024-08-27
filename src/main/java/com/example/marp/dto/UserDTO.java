package com.example.marp.dto;

import java.util.List;

import com.example.marp.model.Center;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "name", "email", "password"})
public record UserDTO(
    Long id,
    String name,
    String email,
    String password,
    List<Center> centers
) {
} 