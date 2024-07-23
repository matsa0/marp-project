package com.example.marp.exception;

import java.time.LocalDateTime;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
@RestController
public class CostumizedExceptionHandler extends ResponseEntityExceptionHandler {
    
    @ExceptionHandler(Exception.class) //handler for generic exceptions
    public final ResponseEntity<ExceptionBody> handleGeneralExceptions(Exception ex, WebRequest webRequest) {
        ExceptionBody exceptionBody = new ExceptionBody(LocalDateTime.now(), HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage(), webRequest.getDescription(false));
        
        return new ResponseEntity<>(exceptionBody, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(ResourceNotFoundException.class) //handler for custom exceptions
    public final ResponseEntity<ExceptionBody> handleResourceNotFoundException(Exception ex, WebRequest webRequest) {
        ExceptionBody exceptionBody = new ExceptionBody(LocalDateTime.now(), HttpStatus.NOT_FOUND, ex.getMessage(), webRequest.getDescription(false));
    
        return new ResponseEntity<>(exceptionBody, HttpStatus.NOT_FOUND);
    }
}
