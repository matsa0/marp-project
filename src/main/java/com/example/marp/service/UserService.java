package com.example.marp.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.marp.dto.UserDTO;
import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.mapper.UserMapper;
import com.example.marp.model.User;
import com.example.marp.repository.UserRepository;


@Service
public class UserService {
    
    @Autowired
    private UserRepository repository;

    public UserDTO findById(Long id) {
        User user = repository.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException(id));

        return UserMapper.INSTANCE.userToUserDTO(user);
    }

    public List<UserDTO> findAll() {
        return repository.findAll().stream()
        .map(UserMapper.INSTANCE::userToUserDTO)
        .collect(Collectors.toList());
    }

    public UserDTO create(User obj) {
        User user = repository.save(obj);

        return UserMapper.INSTANCE.userToUserDTO(user);
    }

    public UserDTO update(User obj) {
        User update = repository.findById(obj.getId())
        .orElseThrow(() -> new ResourceNotFoundException(obj.getId()));

        update.setName(obj.getName());
        update.setEmail(obj.getEmail());
        update.setPassword(obj.getPassword());

        repository.save(update);

        return UserMapper.INSTANCE.userToUserDTO(update);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }
}
