package com.foundit.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

public class ItemMatchResponse {
    private Long id;
    private LostItemResponse lostItem;
    private FoundItemResponse foundItem;
    private Double matchScore;
    private Double imageSimilarityScore;
    private Double objectTypeScore;
    private Double colorScore;
    private Double descriptionScore;
    private String status;
    private Boolean ownerNotified;
    private LocalDateTime matchedAt;
    private String matchNotes;

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public LostItemResponse getLostItem() { return lostItem; }
    public void setLostItem(LostItemResponse lostItem) { this.lostItem = lostItem; }
    public FoundItemResponse getFoundItem() { return foundItem; }
    public void setFoundItem(FoundItemResponse foundItem) { this.foundItem = foundItem; }
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
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public Boolean getOwnerNotified() { return ownerNotified; }
    public void setOwnerNotified(Boolean ownerNotified) { this.ownerNotified = ownerNotified; }
    public LocalDateTime getMatchedAt() { return matchedAt; }
    public void setMatchedAt(LocalDateTime matchedAt) { this.matchedAt = matchedAt; }
    public String getMatchNotes() { return matchNotes; }
    public void setMatchNotes(String matchNotes) { this.matchNotes = matchNotes; }

    public ItemMatchResponse() {}
    public ItemMatchResponse(Long id, LostItemResponse lostItem, FoundItemResponse foundItem, Double matchScore, Double imageSimilarityScore, Double objectTypeScore, Double colorScore, Double descriptionScore, String status, Boolean ownerNotified, LocalDateTime matchedAt, String matchNotes) {
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
        this.matchedAt = matchedAt;
        this.matchNotes = matchNotes;
    }
}
