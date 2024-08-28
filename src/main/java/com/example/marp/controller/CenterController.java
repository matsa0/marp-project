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

import com.example.marp.dto.CenterDTO;
import com.example.marp.model.Center;
import com.example.marp.service.CenterService;

@RestController
@RequestMapping("/api/v1/center")
@CrossOrigin("http://localhost:3000")
public class CenterController {
    
    @Autowired
    public CenterService service;

    @GetMapping("/{id}")
    public ResponseEntity<CenterDTO> findById(@PathVariable Long id) {
        CenterDTO center = service.findById(id);

        return ResponseEntity.ok().body(center);
    }

    @GetMapping
    public ResponseEntity<List<CenterDTO>> findAll() {
        List<CenterDTO> centers = service.findAll();

        return ResponseEntity.ok().body(centers);
    }

    @PostMapping
    public ResponseEntity<CenterDTO> create(@RequestBody Center obj) {
        CenterDTO center = service.create(obj);

        return new ResponseEntity<>(center, HttpStatus.CREATED);
    }

    @PostMapping("/{userId}/centers")
    public ResponseEntity<CenterDTO> addCenterToUser(@RequestBody Center centerObj, @PathVariable Long userId) {
        CenterDTO center = service.addCenterToUser(centerObj, userId);

        return new ResponseEntity<>(center, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CenterDTO> update(@RequestBody Center obj) {
        CenterDTO center = service.update(obj);

        return new ResponseEntity<>(center, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        service.delete(id);

        return ResponseEntity.noContent().build();
    }
}
