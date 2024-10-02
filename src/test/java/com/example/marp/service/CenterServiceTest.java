package com.example.marp.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.model.Center;
import com.example.marp.model.Sensor;
import com.example.marp.model.User;
import com.example.marp.model.enums.CentralStatus;
import com.example.marp.model.enums.SensorStatus;
import com.example.marp.repository.CenterRepository;
import com.example.marp.repository.UserRepository;
import com.example.marp.dto.CenterDTO;
import com.example.marp.mapper.CenterMapper;

import java.util.ArrayList;
import java.util.Optional;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;


@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class CenterServiceTest {

    @Mock
    private CenterRepository repository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private CenterMapper centerMapper;

    @InjectMocks
    private CenterService centerService;

    private Center center;
    private CenterDTO centerDTO;
    private User user;

    @BeforeEach
    void setUp() {
        center = new Center();
        center.setId(1L);

        user = new User();
        user.setId(1L);

        List<Sensor> sensors = new ArrayList<>();
        Sensor sensor1 = new Sensor();
        sensor1.setStatus(SensorStatus.ON);
        sensors.add(sensor1);

        
        Sensor sensor2 = new Sensor();
        sensor2.setStatus(SensorStatus.ON);
        sensors.add(sensor2);

        center.setSensors(sensors);

        centerDTO = new CenterDTO(
            1L,
            "Center Name",
            "password123",
            CentralStatus.ARMED, 
            new ArrayList<>(),
            new ArrayList<>()
        );
    }

    @Test
    void testAddCenterToUser() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(user));
        when(repository.save(center)).thenReturn(center);
        when(centerMapper.centerToCenterDTO(center)).thenReturn(centerDTO);

        CenterDTO result = centerService.addCenterToUser(center, 1L);

        assertNotNull(result);
        assertEquals(1L, result.id());
    

        verify(userRepository, times(1)).findById(1L);
        verify(repository, times(1)).save(center);
    }

    @Test
    void testAddCenterToUser_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            centerService.addCenterToUser(center, 1L);
        });

        verify(userRepository, times(1)).findById(1L);
        verify(repository, times(0)).save(center);
    }

    @Test
    void testAddCenterToUser_Exception() {
        when(userRepository.findById(1L)).thenThrow(new RuntimeException());

        assertThrows(ResourceNotFoundException.class, () -> {
            centerService.addCenterToUser(center, 1L);
        });

        verify(userRepository, times(1)).findById(1L);
        verify(repository, times(0)).save(center);
    }


@Test
    void testDeactivateSensors() {
        when(repository.findById(1L)).thenReturn(Optional.of(center));

        centerService.deactivateSensors(1L);

        for (Sensor sensor : center.getSensors()) {
            assertEquals(SensorStatus.OFF, sensor.getStatus());
        }

        verify(repository, times(1)).findById(1L);
        verify(repository, times(1)).save(center);
    }

    @Test
    void testDeactivateSensors_NotFound() {
        when(repository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            centerService.deactivateSensors(1L);
        });

        verify(repository, times(1)).findById(1L);
        verify(repository, times(0)).save(center);
    }

    @Test
    void testDelete() {
        doNothing().when(repository).deleteById(1L);

        centerService.delete(1L);

        verify(repository, times(1)).deleteById(1L);
    }
}