package com.foundit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class LostItemRequest {
    
    @NotBlank(message = "Item name is required")
    private String itemName;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotNull(message = "Category is required")
    private String category; // ELECTRONICS, DOCUMENTS, etc.
    
    private String color;
    
    private String brand;
    
    @NotNull(message = "Last seen location is required")
    private Long lastSeenLocationId;
    
    private LocalDateTime lastSeenTime;
    
    private String imageUrl; // Optional

    // Getters and Setters
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
    public Long getLastSeenLocationId() { return lastSeenLocationId; }
    public void setLastSeenLocationId(Long lastSeenLocationId) { this.lastSeenLocationId = lastSeenLocationId; }
    public LocalDateTime getLastSeenTime() { return lastSeenTime; }
    public void setLastSeenTime(LocalDateTime lastSeenTime) { this.lastSeenTime = lastSeenTime; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public LostItemRequest() {}
    public LostItemRequest(String itemName, String description, String category, String color, String brand, Long lastSeenLocationId, LocalDateTime lastSeenTime, String imageUrl) {
        this.itemName = itemName;
        this.description = description;
        this.category = category;
        this.color = color;
        this.brand = brand;
        this.lastSeenLocationId = lastSeenLocationId;
        this.lastSeenTime = lastSeenTime;
        this.imageUrl = imageUrl;
    }
}
