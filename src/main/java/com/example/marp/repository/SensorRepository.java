package com.example.marp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.marp.model.Sensor;

public interface SensorRepository extends JpaRepository<Sensor, Long> {
    
}
