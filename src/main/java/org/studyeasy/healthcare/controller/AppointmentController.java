package org.studyeasy.healthcare.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studyeasy.healthcare.dto.AppointmentRequest;
import org.studyeasy.healthcare.dto.AppointmentStatusRequest;
import org.studyeasy.healthcare.model.Appointment;
import org.studyeasy.healthcare.service.InMemoryDataService;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {
    private final InMemoryDataService dataService;

    public AppointmentController(InMemoryDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Appointment> getAppointments() {
        return dataService.getAppointments();
    }

    @PostMapping
    public Appointment createAppointment(@Valid @RequestBody AppointmentRequest request) {
        return dataService.createAppointment(request);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Appointment> updateStatus(@PathVariable String id,
                                                    @Valid @RequestBody AppointmentStatusRequest request) {
        return dataService.updateAppointmentStatus(id, request.getStatus())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
