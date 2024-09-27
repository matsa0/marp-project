package com.example.marp.observer;

import com.example.marp.model.Event;

public interface Subject {
    void addObserver(Event event);
    void notifyObservers(String eventName);
}
