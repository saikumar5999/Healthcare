package org.studyeasy.healthcare.model;

public class VisitTrend {
    private String label;
    private int value;

    public VisitTrend(String label, int value) {
        this.label = label;
        this.value = value;
    }

    public String getLabel() {
        return label;
    }

    public int getValue() {
        return value;
    }
}
