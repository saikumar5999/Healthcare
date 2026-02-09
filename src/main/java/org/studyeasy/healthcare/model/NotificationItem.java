package org.studyeasy.healthcare.model;

public class NotificationItem {
    private String id;
    private String title;
    private String detail;
    private String time;
    private String type;

    public NotificationItem(String id, String title, String detail, String time, String type) {
        this.id = id;
        this.title = title;
        this.detail = detail;
        this.time = time;
        this.type = type;
    }

    public String getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDetail() {
        return detail;
    }

    public String getTime() {
        return time;
    }

    public String getType() {
        return type;
    }
}
