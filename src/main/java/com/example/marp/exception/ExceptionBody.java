package com.example.marp.exception;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;

public class ExceptionBody implements Serializable {
    private static final long serialVersionUID = 1L;

    private LocalDateTime timestamp;
    private HttpStatus status;
    private String message;
    private String details;

    public ExceptionBody(LocalDateTime timestamp, HttpStatus status, String message, String details) {
        this.timestamp = timestamp;
        this.status = status;
        this.message = message;
        this.details = details;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }
    public HttpStatus getStatus() {
        return status;
    }
    public String getMessage() {
        return message;
    }
    public String getDetails() {
        return details;
    }
}
