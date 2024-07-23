package com.example.marp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND) //always return not found status
public class ResourceNotFoundException extends RuntimeException {
    
    public ResourceNotFoundException(Long id) {
        super("Resource not found for id: " + id);
    }
}
