package org.studyeasy.healthcare.model;

public class Doctor {
    private String id;
    private String name;
    private String specialization;
    private String availability;

    public Doctor(String id, String name, String specialization, String availability) {
        this.id = id;
        this.name = name;
        this.specialization = specialization;
        this.availability = availability;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public String getAvailability() {
        return availability;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public void setAvailability(String availability) {
        this.availability = availability;
    }
}
