package com.foundit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class FoundItemResponse {
    private Long id;
    private String itemName;
    private String description;
    private String imageUrl;
    private String foundLocationName;
    private String finderName;
    private String detectedCategory;
    private String detectedColor;
    private String detectedBrand;
    private String objectType;
    private String status;
    private String referenceId;
    private Boolean submittedToSecurity;
    private LocalDateTime foundAt;
    private String securityDeskLocation;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getFoundLocationName() { return foundLocationName; }
    public void setFoundLocationName(String foundLocationName) { this.foundLocationName = foundLocationName; }
    public String getFinderName() { return finderName; }
    public void setFinderName(String finderName) { this.finderName = finderName; }
    public String getDetectedCategory() { return detectedCategory; }
    public void setDetectedCategory(String detectedCategory) { this.detectedCategory = detectedCategory; }
    public String getDetectedColor() { return detectedColor; }
    public void setDetectedColor(String detectedColor) { this.detectedColor = detectedColor; }
    public String getDetectedBrand() { return detectedBrand; }
    public void setDetectedBrand(String detectedBrand) { this.detectedBrand = detectedBrand; }
    public String getObjectType() { return objectType; }
    public void setObjectType(String objectType) { this.objectType = objectType; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public Boolean getSubmittedToSecurity() { return submittedToSecurity; }
    public void setSubmittedToSecurity(Boolean submittedToSecurity) { this.submittedToSecurity = submittedToSecurity; }
    public LocalDateTime getFoundAt() { return foundAt; }
    public void setFoundAt(LocalDateTime foundAt) { this.foundAt = foundAt; }
    public String getSecurityDeskLocation() { return securityDeskLocation; }
    public void setSecurityDeskLocation(String securityDeskLocation) { this.securityDeskLocation = securityDeskLocation; }

    public FoundItemResponse() {}
    public FoundItemResponse(Long id, String itemName, String description, String imageUrl, String foundLocationName, String finderName, String detectedCategory, String detectedColor, String detectedBrand, String objectType, String status, String referenceId, Boolean submittedToSecurity, LocalDateTime foundAt, String securityDeskLocation) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.imageUrl = imageUrl;
        this.foundLocationName = foundLocationName;
        this.finderName = finderName;
        this.detectedCategory = detectedCategory;
        this.detectedColor = detectedColor;
        this.detectedBrand = detectedBrand;
        this.objectType = objectType;
        this.status = status;
        this.referenceId = referenceId;
        this.submittedToSecurity = submittedToSecurity;
        this.foundAt = foundAt;
        this.securityDeskLocation = securityDeskLocation;
    }
}
