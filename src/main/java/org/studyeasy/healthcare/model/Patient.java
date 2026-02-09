package org.studyeasy.healthcare.model;

public class Patient {
    private String id;
    private String name;
    private int age;
    private String gender;
    private String contact;
    private String status;

    public Patient(String id, String name, int age, String gender, String contact, String status) {
        this.id = id;
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.contact = contact;
        this.status = status;
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

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
