package com.foundit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "notifications")
public class Notification {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
    
    @Column(nullable = false)
    private String title;
    
    @Column(length = 1000, nullable = false)
    private String message;
    
    @Enumerated(EnumType.STRING)
    private NotificationType type;
    
    @ManyToOne
    @JoinColumn(name = "related_match_id")
    private ItemMatch relatedMatch;
    
    private Boolean isRead = false;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;
    
    private LocalDateTime readAt;
    
    public enum NotificationType {
        MATCH_FOUND, ITEM_SUBMITTED, ITEM_READY_FOR_COLLECTION, ITEM_COLLECTED, GENERAL
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }
    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public NotificationType getType() { return type; }
    public void setType(NotificationType type) { this.type = type; }
    public ItemMatch getRelatedMatch() { return relatedMatch; }
    public void setRelatedMatch(ItemMatch relatedMatch) { this.relatedMatch = relatedMatch; }
    public Boolean getIsRead() { return isRead; }
    public void setIsRead(Boolean isRead) { this.isRead = isRead; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public LocalDateTime getReadAt() { return readAt; }
    public void setReadAt(LocalDateTime readAt) { this.readAt = readAt; }

    public Notification() {}
    public Notification(Long id, User user, String title, String message, NotificationType type, ItemMatch relatedMatch, Boolean isRead, LocalDateTime createdAt, LocalDateTime readAt) {
        this.id = id;
        this.user = user;
        this.title = title;
        this.message = message;
        this.type = type;
        this.relatedMatch = relatedMatch;
        this.isRead = isRead;
        this.createdAt = createdAt;
        this.readAt = readAt;
    }
}
