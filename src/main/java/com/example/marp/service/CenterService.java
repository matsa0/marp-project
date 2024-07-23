package com.example.marp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.marp.dto.CenterDTO;
import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.mapper.CenterMapper;
import com.example.marp.model.Center;
import com.example.marp.repository.CenterRepository;

@Service
public class CenterService {
    
    @Autowired
    private CenterRepository repository;

    public CenterDTO findById(Long id) {
        Center center = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(id));

        return CenterMapper.INSTANCE.centerToCenterDTO(center);
    }

    public List<CenterDTO> findAll() {
        return repository.findAll().stream()
        .map(CenterMapper.INSTANCE::centerToCenterDTO)
        .collect(Collectors.toList());
    }

    public CenterDTO create(Center obj) {
        Center center = repository.save(obj);

        return CenterMapper.INSTANCE.centerToCenterDTO(center);
    }

    public CenterDTO update(Center obj) {
        Center update = repository.findById(obj.getId())
        .orElseThrow(() -> new ResourceNotFoundException(obj.getId()));

        update.setName(obj.getName());
        update.setPassword(obj.getPassword());
        update.setStatus(obj.getStatus());

        repository.save(update);

        return CenterMapper.INSTANCE.centerToCenterDTO(update);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
