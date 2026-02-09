package org.studyeasy.healthcare.dto;

import jakarta.validation.constraints.NotBlank;

public class DoctorRequest {
    @NotBlank
    private String name;
    @NotBlank
    private String specialization;
    @NotBlank
    private String availability;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public String getAvailability() {
        return availability;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}
