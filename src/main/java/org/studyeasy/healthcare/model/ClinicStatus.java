package org.studyeasy.healthcare.model;

import java.util.List;

public class ClinicStatus {
    private int departmentsActive;
    private int bedsAvailable;
    private String icuAvailability;
    private List<String> alerts;

    public ClinicStatus(int departmentsActive, int bedsAvailable, String icuAvailability, List<String> alerts) {
        this.departmentsActive = departmentsActive;
        this.bedsAvailable = bedsAvailable;
        this.icuAvailability = icuAvailability;
        this.alerts = alerts;
    }

    public int getDepartmentsActive() {
        return departmentsActive;
    }

    public int getBedsAvailable() {
        return bedsAvailable;
    }

    public String getIcuAvailability() {
        return icuAvailability;
    }

    public List<String> getAlerts() {
        return alerts;
    }
}
