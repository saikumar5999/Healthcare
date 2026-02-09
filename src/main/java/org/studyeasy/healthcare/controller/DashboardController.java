package org.studyeasy.healthcare.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.studyeasy.healthcare.model.DashboardSummary;
import org.studyeasy.healthcare.service.InMemoryDataService;

@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {
    private final InMemoryDataService dataService;

    public DashboardController(InMemoryDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public DashboardSummary getDashboard() {
        return dataService.getDashboardSummary();
    }
}
