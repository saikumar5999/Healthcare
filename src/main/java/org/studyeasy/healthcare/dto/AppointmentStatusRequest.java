package org.studyeasy.healthcare.dto;

import jakarta.validation.constraints.NotBlank;

public class AppointmentStatusRequest {
    @NotBlank
    private String status;

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
