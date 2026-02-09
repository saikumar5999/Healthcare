package org.studyeasy.healthcare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.studyeasy.healthcare.model.ClinicStatus;
import org.studyeasy.healthcare.model.NotificationItem;
import org.studyeasy.healthcare.service.InMemoryDataService;

import java.util.List;

@RestController
@RequestMapping("/api")
public class AdminController {
    private final InMemoryDataService dataService;

    public AdminController(InMemoryDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping("/notifications")
    public List<NotificationItem> getNotifications() {
        return dataService.getNotifications();
    }

    @GetMapping("/clinic-status")
    public ClinicStatus getClinicStatus() {
        return dataService.getClinicStatus();
    }
}
