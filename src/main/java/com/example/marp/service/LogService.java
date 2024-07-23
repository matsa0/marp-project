package com.example.marp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.marp.dto.LogDTO;
import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.mapper.LogMapper;
import com.example.marp.model.Log;
import com.example.marp.repository.LogRepository;

@Service
public class LogService {
    
    @Autowired
    private LogRepository repository;

    public LogDTO findById(Long id) {
        Log log = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(id));

        return LogMapper.INSTANCE.logToLogDTO(log);
    }

    public List<LogDTO> findAll() {
        return repository.findAll().stream()
        .map(LogMapper.INSTANCE::logToLogDTO)
        .collect(Collectors.toList());
    }
}
