package com.foundit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "item_returns")
public class ItemReturn {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @OneToOne
    @JoinColumn(name = "match_id", nullable = false)
    private ItemMatch itemMatch;
    
    @ManyToOne
    @JoinColumn(name = "owner_id", nullable = false)
    private User owner;
    
    @ManyToOne
    @JoinColumn(name = "verified_by_id", nullable = false)
    private User verifiedBy; // Security staff
    
    @Column(nullable = false)
    private String ownerIdProof; // ID card number or verification method
    
    @ManyToOne
    @JoinColumn(name = "collection_location_id")
    private Location collectionLocation;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime collectedAt;
    
    @Column(length = 500)
    private String notes;
    
    private String signature; // Digital signature or acknowledgment

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public ItemMatch getItemMatch() { return itemMatch; }
    public void setItemMatch(ItemMatch itemMatch) { this.itemMatch = itemMatch; }
    public User getOwner() { return owner; }
    public void setOwner(User owner) { this.owner = owner; }
    public User getVerifiedBy() { return verifiedBy; }
    public void setVerifiedBy(User verifiedBy) { this.verifiedBy = verifiedBy; }
    public String getOwnerIdProof() { return ownerIdProof; }
    public void setOwnerIdProof(String ownerIdProof) { this.ownerIdProof = ownerIdProof; }
    public Location getCollectionLocation() { return collectionLocation; }
    public void setCollectionLocation(Location collectionLocation) { this.collectionLocation = collectionLocation; }
    public LocalDateTime getCollectedAt() { return collectedAt; }
    public void setCollectedAt(LocalDateTime collectedAt) { this.collectedAt = collectedAt; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public String getSignature() { return signature; }
    public void setSignature(String signature) { this.signature = signature; }

    public ItemReturn() {}
    public ItemReturn(Long id, ItemMatch itemMatch, User owner, User verifiedBy, String ownerIdProof, Location collectionLocation, LocalDateTime collectedAt, String notes, String signature) {
        this.id = id;
        this.itemMatch = itemMatch;
        this.owner = owner;
        this.verifiedBy = verifiedBy;
        this.ownerIdProof = ownerIdProof;
        this.collectionLocation = collectionLocation;
        this.collectedAt = collectedAt;
        this.notes = notes;
        this.signature = signature;
    }
}
