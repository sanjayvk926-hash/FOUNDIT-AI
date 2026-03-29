package com.foundit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "found_items")
public class FoundItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String itemName;
    
    @Column(length = 1000)
    private String description;
    
    @Column(nullable = false)
    private String imageUrl; // Mandatory for found items
    
    @ManyToOne
    @JoinColumn(name = "found_location_id")
    private Location foundLocation;
    
    @ManyToOne
    @JoinColumn(name = "finder_id", nullable = false)
    private User finder;
    
    // AI-detected attributes
    @Enumerated(EnumType.STRING)
    private LostItem.ItemCategory detectedCategory;
    
    private String detectedColor;
    
    private String detectedBrand;
    
    @Column(name = "object_type")
    private String objectType; // YOLO detection result
    
    @Column(length = 2000)
    private String imageFeatures; // OpenCV feature vector (stored as JSON string)
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus status = ItemStatus.SUBMITTED;
    
    @Column(unique = true)
    private String referenceId; // e.g., FND1023
    
    private Boolean submittedToSecurity = false;
    
    @ManyToOne
    @JoinColumn(name = "security_desk_location_id")
    private Location securityDeskLocation;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime foundAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    public enum ItemStatus {
        SUBMITTED, PROCESSING, MATCHED, AT_SECURITY_DESK, RETURNED, UNCLAIMED
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public Location getFoundLocation() { return foundLocation; }
    public void setFoundLocation(Location foundLocation) { this.foundLocation = foundLocation; }
    public User getFinder() { return finder; }
    public void setFinder(User finder) { this.finder = finder; }
    public LostItem.ItemCategory getDetectedCategory() { return detectedCategory; }
    public void setDetectedCategory(LostItem.ItemCategory detectedCategory) { this.detectedCategory = detectedCategory; }
    public String getDetectedColor() { return detectedColor; }
    public void setDetectedColor(String detectedColor) { this.detectedColor = detectedColor; }
    public String getDetectedBrand() { return detectedBrand; }
    public void setDetectedBrand(String detectedBrand) { this.detectedBrand = detectedBrand; }
    public String getObjectType() { return objectType; }
    public void setObjectType(String objectType) { this.objectType = objectType; }
    public String getImageFeatures() { return imageFeatures; }
    public void setImageFeatures(String imageFeatures) { this.imageFeatures = imageFeatures; }
    public ItemStatus getStatus() { return status; }
    public void setStatus(ItemStatus status) { this.status = status; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public Boolean getSubmittedToSecurity() { return submittedToSecurity; }
    public void setSubmittedToSecurity(Boolean submittedToSecurity) { this.submittedToSecurity = submittedToSecurity; }
    public Location getSecurityDeskLocation() { return securityDeskLocation; }
    public void setSecurityDeskLocation(Location securityDeskLocation) { this.securityDeskLocation = securityDeskLocation; }
    public LocalDateTime getFoundAt() { return foundAt; }
    public void setFoundAt(LocalDateTime foundAt) { this.foundAt = foundAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public FoundItem() {}
    public FoundItem(Long id, String itemName, String description, String imageUrl, Location foundLocation, User finder, LostItem.ItemCategory detectedCategory, String detectedColor, String detectedBrand, String objectType, String imageFeatures, ItemStatus status, String referenceId, Boolean submittedToSecurity, Location securityDeskLocation, LocalDateTime foundAt, LocalDateTime updatedAt) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.imageUrl = imageUrl;
        this.foundLocation = foundLocation;
        this.finder = finder;
        this.detectedCategory = detectedCategory;
        this.detectedColor = detectedColor;
        this.detectedBrand = detectedBrand;
        this.objectType = objectType;
        this.imageFeatures = imageFeatures;
        this.status = status;
        this.referenceId = referenceId;
        this.submittedToSecurity = submittedToSecurity;
        this.securityDeskLocation = securityDeskLocation;
        this.foundAt = foundAt;
        this.updatedAt = updatedAt;
    }
}
