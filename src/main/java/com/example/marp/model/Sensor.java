package com.example.marp.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.marp.model.enums.SensorStatus;
import com.example.marp.observer.Observer;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "sensor")
public class Sensor implements Serializable {
    private static final long serialVersionUID = 1L;
    private transient List<Observer> observers = new ArrayList<>(); //don't serialize object

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private SensorStatus status;

    @ManyToOne
    //many side receives foreing key
    @JoinColumn(name = "center_id")
    private Center center;

    @OneToMany(mappedBy = "sensor", cascade = CascadeType.ALL)
    private List<Event> events = new ArrayList<>();

    @OneToOne
    @JoinColumn(name = "log_id")
    private Log log;

    public Sensor(Long id, String name, SensorStatus status, Center center, List<Event> events) {
        this.id = id;
        this.name = name;
        this.status = status;
        this.center = center;
        this.events = events;
    }

    public Sensor() {
    }

    public Sensor(Long id, String name, SensorStatus status) {
        this.id = id;
        this.name = name;
        this.status = status;
    }

    public void addObserver(Observer observer) {
        observers.add(observer);
    }

    public void notifyObservers(String eventName) {
        Event event = new Event();
        event.setName(eventName);
        event.setDate(LocalDateTime.now());
        event.setSensor(this);
        events.add(event); 

        for (Observer observer : observers) {
            observer.update(eventName, this);
        }
    }

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public SensorStatus getStatus() {
        return status;
    }
    public void setStatus(SensorStatus status) {
        this.status = status;

        if(this.status == SensorStatus.ON) {
            notifyObservers("Ativado");
        }
        if(this.status == SensorStatus.OFF) {
            notifyObservers("Desativado");
        }
        if(this.status == SensorStatus.FIRED) {
            notifyObservers("Disparado");
        }
    }
    @JsonIgnore
    public Center getCenter() {
        return center;
    }
    public void setCenter(Center center) {
        this.center = center;
    }
    public List<Event> getEvents() {
        return events;
    }
    public void setEvents(List<Event> events) {
        this.events = events;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((id == null) ? 0 : id.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (getClass() != obj.getClass())
            return false;
        Sensor other = (Sensor) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
