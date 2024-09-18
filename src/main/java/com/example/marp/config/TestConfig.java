package com.example.marp.config;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

import com.example.marp.model.Center;
import com.example.marp.model.Event;
import com.example.marp.model.Log;
import com.example.marp.model.Sensor;
import com.example.marp.model.User;
import com.example.marp.model.enums.CentralStatus;
import com.example.marp.model.enums.SensorStatus;
import com.example.marp.repository.CenterRepository;
import com.example.marp.repository.EventRepository;
import com.example.marp.repository.LogRepository;
import com.example.marp.repository.SensorRepository;
import com.example.marp.repository.UserRepository;

@Configuration
public class TestConfig implements CommandLineRunner {

    @Autowired
    private CenterRepository centerRepository;

    @Autowired 
    private EventRepository eventRepository;

    @Autowired 
    private LogRepository logRepository;

    @Autowired
    private SensorRepository sensorRepository;

    @Autowired
    private UserRepository userRepository;
    
    @Override
    public void run(String... args) throws Exception {
        System.out.println("Running tests...");
        System.out.println("Running tests...");
        System.out.println("Running tests...");
        System.out.println("Running tests...");

        User u1 = new User(null, "Matheus", "matheus@gmail.com", "senha123", null);

        List<Center> centers = new ArrayList<>();
        Center c1 =  new Center(null, "Primeiro andar", "central1", CentralStatus.DESARMED, u1, new ArrayList<>(), new ArrayList<>(), null);
        centers.add(c1);
        
        u1.setCenters(centers); 
        
        List<Sensor> sensors = new ArrayList<>();
        Sensor s1 = new Sensor(null, "Sensor Cozinha", SensorStatus.ON, c1, new ArrayList<>());
        sensors.add(s1);

        c1.setSensors(sensors);
        
        userRepository.save(u1);
        centerRepository.save(c1);
        sensorRepository.save(s1);
        Log l1 = new Log(null, c1, new ArrayList<>());



        Event e1 = new Event(null, "Central armada", LocalDateTime.now(), c1, null, l1);
        Event e2 = new Event(null, "Sensor ativado", LocalDateTime.now(), c1, s1, l1);
  
        l1.getEvents().add(e1);
        l1.getEvents().add(e2);

        c1.getEvents().add(e1);
        s1.getEvents().add(e2);

        logRepository.save(l1);
        eventRepository.saveAll(Arrays.asList(e1, e2));
    }
}
