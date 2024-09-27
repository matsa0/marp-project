package com.example.marp.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.marp.dto.CenterDTO;
import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.mapper.CenterMapper;
import com.example.marp.model.Center;
import com.example.marp.model.User;
import com.example.marp.repository.CenterRepository;
import com.example.marp.repository.UserRepository;

@Service
public class CenterService {
    
    @Autowired
    private CenterRepository repository;

    @Autowired 
    private UserRepository userRepository;

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

    public CenterDTO addCenterToUser(Center centerObj, Long userId) {
        try {
            Optional<User> optUser = userRepository.findById(userId);
    
            if (optUser.isPresent()) {
                User u1 = optUser.get();
    
                centerObj.setUser(u1);
                u1.getCenters().add(centerObj); 

                repository.save(centerObj);
    
                return CenterMapper.INSTANCE.centerToCenterDTO(centerObj);
            } else {
                throw new ResourceNotFoundException(userId);
            }
        } catch (Exception e) {
            throw new ResourceNotFoundException(centerObj.getId());
        }
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
