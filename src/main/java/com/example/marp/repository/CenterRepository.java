package com.example.marp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.marp.model.Center;

public interface CenterRepository extends JpaRepository<Center, Long> {
    
}
