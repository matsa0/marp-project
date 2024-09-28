package com.example.marp.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.marp.dto.EventDTO;
import com.example.marp.dto.SensorDTO;
import com.example.marp.model.Sensor;
import com.example.marp.service.SensorService;

@RestController
@RequestMapping("/api/v1/sensor")
@CrossOrigin("http://localhost:3000")
public class SensorController {
    
    @Autowired
    private SensorService service;

    @GetMapping("/{id}")
    public ResponseEntity<SensorDTO> findById(@PathVariable Long id) {
        SensorDTO sensor = service.findById(id);

        return ResponseEntity.ok().body(sensor);
    }

    @GetMapping
    public ResponseEntity<List<SensorDTO>> findAll() {
        List<SensorDTO> sensors = service.findAll();

        return ResponseEntity.ok().body(sensors);
    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<EventDTO>> findEvents(@PathVariable Long id) {
        List<EventDTO> events = service.findEvents(id);

        return new ResponseEntity<>(events, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<SensorDTO> create(@RequestBody Sensor obj) {
        SensorDTO sensor = service.create(obj);

        return new ResponseEntity<>(sensor, HttpStatus.CREATED);
    }

    @PostMapping("/{centerId}/sensors")
    public ResponseEntity<SensorDTO> addSensorToCenter(@RequestBody Sensor obj, @PathVariable Long centerId) {
        SensorDTO sensor = service.addSensorToCenter(obj, centerId);

        return new ResponseEntity<>(sensor, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<SensorDTO> update(@RequestBody Sensor obj) {
        SensorDTO sensor = service.update(obj);

        return new ResponseEntity<>(sensor, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
