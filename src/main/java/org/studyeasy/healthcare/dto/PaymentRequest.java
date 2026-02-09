package org.studyeasy.healthcare.dto;

import jakarta.validation.constraints.NotBlank;

public class PaymentRequest {
    @NotBlank
    private String billId;
    @NotBlank
    private String name;
    @NotBlank
    private String cardNumber;
    @NotBlank
    private String expiry;
    @NotBlank
    private String cvc;

    public String getBillId() {
        return billId;
    }

    public void setBillId(String billId) {
        this.billId = billId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public String getExpiry() {
        return expiry;
    }

    public void setExpiry(String expiry) {
        this.expiry = expiry;
    }

    public String getCvc() {
        return cvc;
    }

    public void setCvc(String cvc) {
        this.cvc = cvc;
    }
}
