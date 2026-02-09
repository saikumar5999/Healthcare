package org.studyeasy.healthcare.dto;

import jakarta.validation.constraints.NotBlank;

public class PatientUpdateRequest {
    @NotBlank
    private String contact;
    @NotBlank
    private String status;

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
