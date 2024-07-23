package com.example.marp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.marp.model.Log;

public interface LogRepository extends JpaRepository<Log, Long> {
    
}
