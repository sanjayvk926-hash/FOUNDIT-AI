package com.foundit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "item_matches")
public class ItemMatch {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "lost_item_id", nullable = false)
    private LostItem lostItem;
    
    @ManyToOne
    @JoinColumn(name = "found_item_id", nullable = false)
    private FoundItem foundItem;
    
    @Column(nullable = false)
    private Double matchScore; // Overall match score (0.0 to 1.0)
    
    private Double imageSimilarityScore;
    
    private Double objectTypeScore;
    
    private Double colorScore;
    
    private Double descriptionScore;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private MatchStatus status = MatchStatus.PENDING;
    
    private Boolean ownerNotified = false;
    
    private LocalDateTime notificationSentAt;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime matchedAt;
    
    @Column(length = 1000)
    private String matchNotes;
    
    public enum MatchStatus {
        PENDING, CONFIRMED, REJECTED, VERIFIED
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LostItem getLostItem() { return lostItem; }
    public void setLostItem(LostItem lostItem) { this.lostItem = lostItem; }
    public FoundItem getFoundItem() { return foundItem; }
    public void setFoundItem(FoundItem foundItem) { this.foundItem = foundItem; }
    public Double getMatchScore() { return matchScore; }
    public void setMatchScore(Double matchScore) { this.matchScore = matchScore; }
    public Double getImageSimilarityScore() { return imageSimilarityScore; }
    public void setImageSimilarityScore(Double imageSimilarityScore) { this.imageSimilarityScore = imageSimilarityScore; }
    public Double getObjectTypeScore() { return objectTypeScore; }
    public void setObjectTypeScore(Double objectTypeScore) { this.objectTypeScore = objectTypeScore; }
    public Double getColorScore() { return colorScore; }
    public void setColorScore(Double colorScore) { this.colorScore = colorScore; }
    public Double getDescriptionScore() { return descriptionScore; }
    public void setDescriptionScore(Double descriptionScore) { this.descriptionScore = descriptionScore; }
    public MatchStatus getStatus() { return status; }
    public void setStatus(MatchStatus status) { this.status = status; }
    public Boolean getOwnerNotified() { return ownerNotified; }
    public void setOwnerNotified(Boolean ownerNotified) { this.ownerNotified = ownerNotified; }
    public LocalDateTime getNotificationSentAt() { return notificationSentAt; }
    public void setNotificationSentAt(LocalDateTime notificationSentAt) { this.notificationSentAt = notificationSentAt; }
    public LocalDateTime getMatchedAt() { return matchedAt; }
    public void setMatchedAt(LocalDateTime matchedAt) { this.matchedAt = matchedAt; }
    public String getMatchNotes() { return matchNotes; }
    public void setMatchNotes(String matchNotes) { this.matchNotes = matchNotes; }

    public ItemMatch() {}
    public ItemMatch(Long id, LostItem lostItem, FoundItem foundItem, Double matchScore, Double imageSimilarityScore, Double objectTypeScore, Double colorScore, Double descriptionScore, MatchStatus status, Boolean ownerNotified, LocalDateTime notificationSentAt, LocalDateTime matchedAt, String matchNotes) {
        this.id = id;
        this.lostItem = lostItem;
        this.foundItem = foundItem;
        this.matchScore = matchScore;
        this.imageSimilarityScore = imageSimilarityScore;
        this.objectTypeScore = objectTypeScore;
        this.colorScore = colorScore;
        this.descriptionScore = descriptionScore;
        this.status = status;
        this.ownerNotified = ownerNotified;
        this.notificationSentAt = notificationSentAt;
        this.matchedAt = matchedAt;
        this.matchNotes = matchNotes;
    }
}
