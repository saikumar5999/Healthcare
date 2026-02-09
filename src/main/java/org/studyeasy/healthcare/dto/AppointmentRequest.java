package org.studyeasy.healthcare.dto;

import jakarta.validation.constraints.NotBlank;

public class AppointmentRequest {
    @NotBlank
    private String patient;
    @NotBlank
    private String doctor;
    @NotBlank
    private String date;
    @NotBlank
    private String time;
    @NotBlank
    private String status;

    public String getPatient() {
        return patient;
    }

    public void setPatient(String patient) {
        this.patient = patient;
    }

    public String getDoctor() {
        return doctor;
    }

    public void setDoctor(String doctor) {
        this.doctor = doctor;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
