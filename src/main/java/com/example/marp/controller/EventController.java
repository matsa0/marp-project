package com.example.marp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.marp.dto.EventDTO;
import com.example.marp.model.Event;
import com.example.marp.service.EventService;

@RestController
@RequestMapping("/api/v1/event")
public class EventController {
    
    @Autowired
    private EventService service;

    @GetMapping("/{id}")
    public ResponseEntity<EventDTO> findById(@PathVariable Long id) {
        EventDTO event = service.findById(id);

        return ResponseEntity.ok().body(event);
    }

    @GetMapping
    public ResponseEntity<List<EventDTO>> findAll() {
        List<EventDTO> events = service.findAll();

        return ResponseEntity.ok().body(events);
    }

    @PostMapping
    public ResponseEntity<EventDTO> create(@RequestBody Event obj) {
        EventDTO event = service.create(obj);

        return new ResponseEntity<>(event, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EventDTO> update(@RequestBody Event obj) {
        EventDTO event = service.update(obj);

        return new ResponseEntity<>(event, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}

