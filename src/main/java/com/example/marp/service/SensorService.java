package com.example.marp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.marp.dto.EventDTO;
import com.example.marp.dto.SensorDTO;
import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.mapper.EventMapper;
import com.example.marp.mapper.SensorMapper;
import com.example.marp.model.Center;
import com.example.marp.model.Sensor;
import com.example.marp.model.Event;
import com.example.marp.repository.CenterRepository;
import com.example.marp.repository.SensorRepository;

@Service
public class SensorService {
    
    @Autowired
    private SensorRepository repository;

    @Autowired
    private CenterRepository centerRepository;

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

    public List<EventDTO> findEvents(Long id) {
        Sensor sensor = repository.findById(id).orElseThrow(
            () -> new ResourceNotFoundException(id));

        List<Event> events = sensor.getEvents();

        return events.stream()
        .map(EventMapper.INSTANCE::eventToEventDTO)
        .collect(Collectors.toList());
    }

    public SensorDTO create(Sensor obj) {
        Sensor sensor = repository.save(obj);

        return SensorMapper.INSTANCE.sensorToSensorDTO(sensor);
    }

    public SensorDTO addSensorToCenter(Sensor obj, Long centerId) {
        try {
            Optional<Center> centerOpt = centerRepository.findById(centerId);

            if(centerOpt.isPresent()) {
                Center center = centerOpt.get();

                obj.setCenter(center);
                center.getSensors().add(obj);
                repository.save(obj);

                return SensorMapper.INSTANCE.sensorToSensorDTO(obj);
            } else {
                throw new ResourceNotFoundException(centerId);
            }
        } catch(Exception e) {
            throw new ResourceNotFoundException(obj.getId());
        }
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
