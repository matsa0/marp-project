package com.example.marp.dto;


import com.example.marp.model.Center;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonPropertyOrder;

@JsonPropertyOrder({"id", "center"})
public record LogDTO(
    Long id,
    @JsonProperty(namespace = "center_id")
    Center center
) {
    
}
