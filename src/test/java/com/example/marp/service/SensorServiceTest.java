package com.example.marp.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.example.marp.exception.ResourceNotFoundException;
import com.example.marp.model.Center;
import com.example.marp.model.Sensor;
import com.example.marp.model.enums.SensorStatus;
import com.example.marp.repository.CenterRepository;
import com.example.marp.repository.SensorRepository;
import com.example.marp.dto.SensorDTO;
import com.example.marp.mapper.SensorMapper;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;

import java.util.Optional;
import java.util.ArrayList;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class SensorServiceTest {

    @Mock
    private SensorRepository repository;

    @Mock
    private CenterRepository centerRepository;

    @Mock
    private SensorMapper sensorMapper;

    @InjectMocks
    private SensorService sensorService;

    private Sensor sensor;
    private SensorDTO sensorDTO;
    private Center center;

    @BeforeEach
    void setUp() {
        sensor = new Sensor();
        sensor.setId(1L);

        center = new Center();
        center.setId(1L);

        sensorDTO = new SensorDTO(
            1L,
            "Sensor Name",
            SensorStatus.ON, 
            new ArrayList<>()
        );
    }

    @Test
    void testAddSensorToCenter() {
        when(centerRepository.findById(1L)).thenReturn(Optional.of(center));
        when(repository.save(sensor)).thenReturn(sensor);
        when(sensorMapper.sensorToSensorDTO(sensor)).thenReturn(sensorDTO);

        SensorDTO result = sensorService.addSensorToCenter(sensor, 1L);

        assertNotNull(result);
        assertEquals(1L, result.id());

        verify(centerRepository, times(1)).findById(1L);
        verify(repository, times(1)).save(sensor);
    }

    @Test
    void testAddSensorToCenter_CenterNotFound() {
        when(centerRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> {
            sensorService.addSensorToCenter(sensor, 1L);
        });

        verify(centerRepository, times(1)).findById(1L);
        verify(repository, times(0)).save(sensor);
    }

    @Test
    void testAddSensorToCenter_Exception() {
        when(centerRepository.findById(1L)).thenThrow(new RuntimeException());

        assertThrows(ResourceNotFoundException.class, () -> {
            sensorService.addSensorToCenter(sensor, 1L);
        });

        verify(centerRepository, times(1)).findById(1L);
        verify(repository, times(0)).save(sensor);
    }
}