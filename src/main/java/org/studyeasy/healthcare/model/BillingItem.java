package org.studyeasy.healthcare.model;

public class BillingItem {
    private String id;
    private String service;
    private int amount;
    private String date;
    private String status;

    public BillingItem(String id, String service, int amount, String date, String status) {
        this.id = id;
        this.service = service;
        this.amount = amount;
        this.date = date;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getService() {
        return service;
    }

    public int getAmount() {
        return amount;
    }

    public String getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
