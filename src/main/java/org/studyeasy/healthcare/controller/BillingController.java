package org.studyeasy.healthcare.controller;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.studyeasy.healthcare.dto.PaymentRequest;
import org.studyeasy.healthcare.model.BillingItem;
import org.studyeasy.healthcare.service.InMemoryDataService;

import java.util.List;

@RestController
@RequestMapping("/api/billing")
public class BillingController {
    private final InMemoryDataService dataService;

    public BillingController(InMemoryDataService dataService) {
        this.dataService = dataService;
    }

    @GetMapping
    public List<BillingItem> getBilling() {
        return dataService.getBillingItems();
    }

    @PostMapping("/pay")
    public ResponseEntity<BillingItem> payBill(@Valid @RequestBody PaymentRequest request) {
        return dataService.payBill(request.getBillId())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
