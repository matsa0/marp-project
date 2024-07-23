package com.example.marp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.marp.dto.LogDTO;
import com.example.marp.service.LogService;

@RestController
@RequestMapping("/api/v1/log")
public class LogController {
    
    @Autowired
    public LogService service;

    @GetMapping("/{id}")
    public ResponseEntity<LogDTO> findById(@PathVariable Long id) {
        LogDTO log = service.findById(id);

        return ResponseEntity.ok().body(log);
    }

    @GetMapping
    public ResponseEntity<List<LogDTO>> findAll() {
        List<LogDTO> logs = service.findAll();

        return ResponseEntity.ok().body(logs);
    }
}
