package com.example.marp.model;

import java.io.Serializable;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;

import com.example.marp.observer.Observer;
import com.example.marp.repository.EventRepository;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "event")
public class Event implements Serializable, Observer  {
    private static final long serialVersionUID = 1L;
    @Autowired
    private transient EventRepository repository; //don't serialize object

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "center_id")
    private Center center;

    @ManyToOne
    @JoinColumn(name = "sensor_id")
    private Sensor sensor;

    @ManyToOne
    @JoinColumn(name = "log_id")
    private Log log;

    public Event(Long id, String name, LocalDateTime date, Center center, Sensor sensor, Log log) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.center = center;
        this.sensor = sensor;
        this.log = log;
    }

    public Event() {
    }    

    public Event(Long id, String name, LocalDateTime date) {
        this.id = id;
        this.name = name;
        this.date = date;
    }

    @Override
    public void update(String eventName, Object object) {
        this.name = eventName;
        this.date = LocalDateTime.now();

        if(object instanceof Center) {
            this.center = (Center) object;
            this.center.getEvents().add(this);
        }
        else if(object instanceof Sensor) {
            this.sensor = (Sensor) object;
            this.sensor.getEvents().add(this);
        }
        repository.save(this);
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
    public LocalDateTime getDate() {
        return date;
    }
    public void setDate(LocalDateTime date) {
        this.date = date;
    }
    @JsonIgnore
    public Center getCenter() {
        return center;
    }
    public void setCenter(Center center) {
        this.center = center;
    }
    @JsonIgnore
    public Sensor getSensor() {
        return sensor;
    }
    public void setSensor(Sensor sensor) {
        this.sensor = sensor;
    }
    @JsonIgnore
    public Log getLog() {
        return log;
    }
    public void setLog(Log log) {
        this.log = log;
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
        Event other = (Event) obj;
        if (id == null) {
            if (other.id != null)
                return false;
        } else if (!id.equals(other.id))
            return false;
        return true;
    }

    
}
