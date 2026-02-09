package org.studyeasy.healthcare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.studyeasy.healthcare.model.Appointment;
import org.studyeasy.healthcare.model.ReportItem;
import org.studyeasy.healthcare.service.InMemoryDataService;

import java.util.List;

@RestController
@RequestMapping("/api/portal")
public class PortalController {
    private final InMemoryDataService dataService;

    public PortalController(InMemoryDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/reports")
    public List<ReportItem> getReports() {
        return dataService.getReports();
    }

    @GetMapping("/appointments")
    public List<Appointment> getPortalAppointments() {
        return dataService.getAppointments();
    }
}
