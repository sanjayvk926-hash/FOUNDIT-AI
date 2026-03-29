package com.foundit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class LostItemResponse {
    private Long id;
    private String itemName;
    private String description;
    private String category;
    private String color;
    private String brand;
    private String lastSeenLocationName;
    private LocalDateTime lastSeenTime;
    private String ownerName;
    private String ownerEmail;
    private String imageUrl;
    private String status;
    private String referenceId;
    private LocalDateTime reportedAt;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public String getLastSeenLocationName() { return lastSeenLocationName; }
    public void setLastSeenLocationName(String lastSeenLocationName) { this.lastSeenLocationName = lastSeenLocationName; }
    public LocalDateTime getLastSeenTime() { return lastSeenTime; }
    public void setLastSeenTime(LocalDateTime lastSeenTime) { this.lastSeenTime = lastSeenTime; }
    public String getOwnerName() { return ownerName; }
    public void setOwnerName(String ownerName) { this.ownerName = ownerName; }
    public String getOwnerEmail() { return ownerEmail; }
    public void setOwnerEmail(String ownerEmail) { this.ownerEmail = ownerEmail; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public LocalDateTime getReportedAt() { return reportedAt; }
    public void setReportedAt(LocalDateTime reportedAt) { this.reportedAt = reportedAt; }

    public LostItemResponse() {}
    public LostItemResponse(Long id, String itemName, String description, String category, String color, String brand, String lastSeenLocationName, LocalDateTime lastSeenTime, String ownerName, String ownerEmail, String imageUrl, String status, String referenceId, LocalDateTime reportedAt) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.category = category;
        this.color = color;
        this.brand = brand;
        this.lastSeenLocationName = lastSeenLocationName;
        this.lastSeenTime = lastSeenTime;
        this.ownerName = ownerName;
        this.ownerEmail = ownerEmail;
        this.imageUrl = imageUrl;
        this.status = status;
        this.referenceId = referenceId;
        this.reportedAt = reportedAt;
    }
}
