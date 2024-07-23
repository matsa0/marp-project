package com.example.marp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.marp.dto.EventDTO;
import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.mapper.EventMapper;
import com.example.marp.model.Event;
import com.example.marp.repository.EventRepository;

@Service
public class EventService {
    
    @Autowired
    private EventRepository repository;

    public EventDTO findById(Long id) {
        Event event = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(id));

        return EventMapper.INSTANCE.eventToEventDTO(event);
    }

    public List<EventDTO> findAll() {
        return repository.findAll().stream()
        .map(EventMapper.INSTANCE::eventToEventDTO)
        .collect(Collectors.toList());
    }

    public EventDTO create(Event obj) {
        Event event = repository.save(obj);

        return EventMapper.INSTANCE.eventToEventDTO(event);
    }

    public EventDTO update(Event obj) {
        Event update = repository.findById(obj.getId())
        .orElseThrow(() -> new ResourceNotFoundException(obj.getId()));

        update.setName(obj.getName());
        update.setDate(obj.getDate());

        repository.save(update);

        return EventMapper.INSTANCE.eventToEventDTO(update);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
