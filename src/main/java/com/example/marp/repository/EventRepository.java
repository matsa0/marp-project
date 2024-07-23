package com.example.marp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.marp.model.Event;

public interface EventRepository extends JpaRepository<Event, Long> {
    
}
