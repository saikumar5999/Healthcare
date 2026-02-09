package org.studyeasy.healthcare.model;

public class Appointment {
    private String id;
    private String date;
    private String time;
    private String patient;
    private String doctor;
    private String status;

    public Appointment(String id, String date, String time, String patient, String doctor, String status) {
        this.id = id;
        this.date = date;
        this.time = time;
        this.patient = patient;
        this.doctor = doctor;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getDate() {
        return date;
    }

    public String getTime() {
        return time;
    }

    public String getPatient() {
        return patient;
    }

    public String getDoctor() {
        return doctor;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
