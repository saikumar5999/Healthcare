package org.studyeasy.healthcare.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studyeasy.healthcare.dto.PatientUpdateRequest;
import org.studyeasy.healthcare.model.Patient;
import org.studyeasy.healthcare.model.PatientDetails;
import org.studyeasy.healthcare.service.InMemoryDataService;

import java.util.List;

@RestController
@RequestMapping("/api/patients")
public class PatientController {
    private final InMemoryDataService dataService;

    public PatientController(InMemoryDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<Patient> getPatients() {
        return dataService.getPatients();
    }

    @GetMapping("/{id}")
    public ResponseEntity<PatientDetails> getPatient(@PathVariable String id) {
        return dataService.getPatientDetails(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Patient> updatePatient(@PathVariable String id,
                                                 @Valid @RequestBody PatientUpdateRequest request) {
        return dataService.updatePatient(id, request)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
