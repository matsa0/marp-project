package com.example.marp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.marp.dto.SensorDTO;
import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.mapper.SensorMapper;
import com.example.marp.model.Sensor;
import com.example.marp.repository.SensorRepository;

@Service
public class SensorService {
    
    @Autowired
    private SensorRepository repository;

    public SensorDTO findById(Long id) {
        Sensor sensor = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(id));

        return SensorMapper.INSTANCE.sensorToSensorDTO(sensor);
    }

    public List<SensorDTO> findAll() {
        return repository.findAll().stream()
        .map(SensorMapper.INSTANCE::sensorToSensorDTO)
        .collect(Collectors.toList());
    }

    public SensorDTO create(Sensor obj) {
        Sensor sensor = repository.save(obj);

        return SensorMapper.INSTANCE.sensorToSensorDTO(sensor);
    }

    public SensorDTO update(Sensor obj) {
        Sensor update = repository.findById(obj.getId())
        .orElseThrow(() -> new ResourceNotFoundException(obj.getId()));

        update.setName(obj.getName());
        update.setStatus(obj.getStatus());

        repository.save(update);

        return SensorMapper.INSTANCE.sensorToSensorDTO(update);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
