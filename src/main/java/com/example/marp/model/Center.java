package com.example.marp.model;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.example.marp.model.enums.CentralStatus;
import com.example.marp.observer.Observer;
import com.example.marp.observer.Subject;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "center")
public class Center implements Serializable, Subject {
    private static final long serialVersionUID = 1L;
    private transient List<Observer> observers = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String password;
    private CentralStatus status;

    @ManyToOne
    //the many side of the relationship receives the foreign key
    @JoinColumn(name = "user_id") 
    private User user;

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    private List<Sensor> sensors = new ArrayList<>();

    @OneToMany(mappedBy = "center", cascade = CascadeType.ALL)
    private List<Event> events = new ArrayList<>();


    public Center() {
    }

    public Center(Long id, String name, String password, CentralStatus status) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.status = status;
    }

    public Center(Long id, String name, String password, CentralStatus status, User user, List<Sensor> sensors,
    List<Event> events) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.status = status;
        this.user = user;
        this.sensors = sensors;
        this.events = events;
    }

    @Override
    public void addObserver(Event event) {
        events.add(event);
    }

    @Override
    public void notifyObservers(String eventName) {
        Event event = new Event();
        event.setName(eventName);
        event.setDate(LocalDateTime.now());
        event.setCenter(this);
        events.add(event);

        for(Observer observer : observers) {
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
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public CentralStatus getStatus() {
        return status;
    }
    public void setStatus(CentralStatus status) {
        this.status = status;

        if(this.status == CentralStatus.ARMED) {
            notifyObservers("Armada");
        }
        if(this.status == CentralStatus.DESARMED) {
            notifyObservers("Desarmada");
        }
    }
    @JsonIgnore
    public User getUser() {
        return user;
    }
    public void setUser(User user) {
        this.user = user;
    }
    public List<Sensor> getSensors() {
        return sensors;
    }
    public void setSensors(List<Sensor> sensors) {
        this.sensors = sensors;
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
        Center other = (Center) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }
}
