package com.foundit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "lost_items")
public class LostItem {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String itemName;
    
    @Column(length = 1000)
    private String description;
    
    @Enumerated(EnumType.STRING)
    private ItemCategory category;
    
    private String color;
    
    private String brand;
    
    @ManyToOne
    @JoinColumn(name = "last_seen_location_id")
    private Location lastSeenLocation;
    
    private LocalDateTime lastSeenTime;
    
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    
    private String imageUrl; // Optional image
    
    @Column(length = 2000)
    private String imageFeatures; // AI features for matching
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ItemStatus status = ItemStatus.REPORTED;
    
    @Column(unique = true)
    private String referenceId; // e.g., LST1023
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime reportedAt;
    
    @UpdateTimestamp
    private LocalDateTime updatedAt;
    
    public enum ItemCategory {
        ELECTRONICS, DOCUMENTS, ACCESSORIES, CLOTHING, BOOKS, BAGS, JEWELRY, KEYS, WALLETS, SPORTS_EQUIPMENT, OTHER
    }
    
    public enum ItemStatus {
        REPORTED, MATCHED, FOUND, COLLECTED, CLOSED
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getItemName() { return itemName; }
    public void setItemName(String itemName) { this.itemName = itemName; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public ItemCategory getCategory() { return category; }
    public void setCategory(ItemCategory category) { this.category = category; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getBrand() { return brand; }
    public void setBrand(String brand) { this.brand = brand; }
    public Location getLastSeenLocation() { return lastSeenLocation; }
    public void setLastSeenLocation(Location lastSeenLocation) { this.lastSeenLocation = lastSeenLocation; }
    public LocalDateTime getLastSeenTime() { return lastSeenTime; }
    public void setLastSeenTime(LocalDateTime lastSeenTime) { this.lastSeenTime = lastSeenTime; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getImageFeatures() { return imageFeatures; }
    public void setImageFeatures(String imageFeatures) { this.imageFeatures = imageFeatures; }
    public ItemStatus getStatus() { return status; }
    public void setStatus(ItemStatus status) { this.status = status; }
    public String getReferenceId() { return referenceId; }
    public void setReferenceId(String referenceId) { this.referenceId = referenceId; }
    public LocalDateTime getReportedAt() { return reportedAt; }
    public void setReportedAt(LocalDateTime reportedAt) { this.reportedAt = reportedAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }

    public LostItem() {}
    public LostItem(Long id, String itemName, String description, ItemCategory category, String color, String brand, Location lastSeenLocation, LocalDateTime lastSeenTime, User owner, String imageUrl, String imageFeatures, ItemStatus status, String referenceId, LocalDateTime reportedAt, LocalDateTime updatedAt) {
        this.id = id;
        this.itemName = itemName;
        this.description = description;
        this.category = category;
        this.color = color;
        this.brand = brand;
        this.lastSeenLocation = lastSeenLocation;
        this.lastSeenTime = lastSeenTime;
        this.owner = owner;
        this.imageUrl = imageUrl;
        this.imageFeatures = imageFeatures;
        this.status = status;
        this.referenceId = referenceId;
        this.reportedAt = reportedAt;
        this.updatedAt = updatedAt;
    }
}
