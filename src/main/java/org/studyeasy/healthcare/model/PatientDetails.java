package org.studyeasy.healthcare.model;

import java.util.List;

public class PatientDetails {
    private String id;
    private String name;
    private int age;
    private String gender;
    private String contact;
    private String bloodType;
    private String allergies;
    private List<String> medicalHistory;
    private List<String> prescriptions;
    private List<String> labReports;

    public PatientDetails(String id, String name, int age, String gender, String contact, String bloodType,
                          String allergies, List<String> medicalHistory, List<String> prescriptions,
                          List<String> labReports) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.contact = contact;
        this.bloodType = bloodType;
        this.allergies = allergies;
        this.medicalHistory = medicalHistory;
        this.prescriptions = prescriptions;
        this.labReports = labReports;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }

    public String getGender() {
        return gender;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getBloodType() {
        return bloodType;
    }

    public String getAllergies() {
        return allergies;
    }

    public List<String> getMedicalHistory() {
        return medicalHistory;
    }

    public List<String> getPrescriptions() {
        return prescriptions;
    }

    public List<String> getLabReports() {
        return labReports;
    }
}
