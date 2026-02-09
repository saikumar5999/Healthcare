package org.studyeasy.healthcare.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studyeasy.healthcare.dto.DoctorRequest;
import org.studyeasy.healthcare.model.Doctor;
import org.studyeasy.healthcare.service.InMemoryDataService;

import java.util.List;

@RestController
@RequestMapping("/api/doctors")
public class DoctorController {
    private final InMemoryDataService dataService;

    public DoctorController(InMemoryDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Doctor> getDoctors() {
        return dataService.getDoctors();
    }

    @PostMapping
    public Doctor createDoctor(@Valid @RequestBody DoctorRequest request) {
        return dataService.createDoctor(request);
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Doctor> updateDoctor(@PathVariable String id,
                                               @Valid @RequestBody DoctorRequest request) {
        return dataService.updateDoctor(id, request)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
