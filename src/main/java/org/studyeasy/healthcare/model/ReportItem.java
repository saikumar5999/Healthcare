package org.studyeasy.healthcare.model;

public class ReportItem {
    private String id;
    private String title;
    private String date;
    private String status;

    public ReportItem(String id, String title, String date, String status) {
        this.id = id;
        this.title = title;
        this.date = date;
        this.status = status;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDate() {
        return date;
    }

    public String getStatus() {
        return status;
    }
}
