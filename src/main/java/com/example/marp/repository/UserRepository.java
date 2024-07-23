package com.example.marp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.marp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    
}
