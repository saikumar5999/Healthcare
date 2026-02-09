package org.studyeasy.healthcare.model;

import java.util.List;

public class DashboardSummary {
    private int totalPatients;
    private int todaysAppointments;
    private int doctorsOnDuty;
    private List<VisitTrend> visitTrends;

    public DashboardSummary(int totalPatients, int todaysAppointments, int doctorsOnDuty, List<VisitTrend> visitTrends) {
        this.totalPatients = totalPatients;
        this.todaysAppointments = todaysAppointments;
        this.doctorsOnDuty = doctorsOnDuty;
        this.visitTrends = visitTrends;
    }

    public int getTotalPatients() {
        return totalPatients;
    }

    public int getTodaysAppointments() {
        return todaysAppointments;
    }

    public int getDoctorsOnDuty() {
        return doctorsOnDuty;
    }

    public List<VisitTrend> getVisitTrends() {
        return visitTrends;
    }
}
