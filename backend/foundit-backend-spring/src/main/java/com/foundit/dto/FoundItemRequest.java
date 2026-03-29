package com.foundit.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

public class FoundItemRequest {
    
    @NotBlank(message = "Item name is required")
    private String itemName;
    
    @NotBlank(message = "Description is required")
    private String description;
    
    @NotBlank(message = "Image URL is required")
    private String imageUrl;
    
    @NotNull(message = "Found location is required")
    private Long foundLocationId;

    // Getters and Setters
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Long getFoundLocationId() { return foundLocationId; }
    public void setFoundLocationId(Long foundLocationId) { this.foundLocationId = foundLocationId; }

    public FoundItemRequest() {}
    public FoundItemRequest(String itemName, String description, String imageUrl, Long foundLocationId) {
        this.itemName = itemName;
        this.description = description;
        this.imageUrl = imageUrl;
        this.foundLocationId = foundLocationId;
    }
}
