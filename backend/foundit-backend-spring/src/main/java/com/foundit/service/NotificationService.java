package com.foundit.service;

import com.foundit.model.ItemMatch;
import com.foundit.model.Notification;
import com.foundit.model.User;
import com.foundit.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    @Autowired
    private JavaMailSender mailSender;

    /**
     * Notify owner when their lost item is found
     */
    @Async
    @Transactional
    public void notifyOwnerOfMatch(ItemMatch match) {
        User owner = match.getLostItem().getOwner();
        
        String title = "Your Lost Item May Have Been Found!";
        String message = String.format(
            "Good news! Your lost item '%s' may have been found.\n\n" +
            "Location: %s\n" +
            "Found near: %s\n" +
            "Match Confidence: %.0f%%\n" +
            "Reference ID: %s\n\n" +
            "Please visit the Security Desk at %s to collect your item. " +
            "Remember to bring your ID for verification.",
            match.getLostItem().getItemName(),
            match.getFoundItem().getSecurityDeskLocation() != null ? 
                match.getFoundItem().getSecurityDeskLocation().getName() : "Security Desk – Main Building",
            match.getFoundItem().getFoundLocation().getName(),
            match.getMatchScore() * 100,
            match.getFoundItem().getReferenceId(),
            match.getFoundItem().getSecurityDeskLocation() != null ? 
                match.getFoundItem().getSecurityDeskLocation().getName() : "Main Building"
        );

        // Create in-app notification
        Notification notification = new Notification();
        notification.setUser(owner);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(Notification.NotificationType.MATCH_FOUND);
        notification.setRelatedMatch(match);
        notification.setIsRead(false);
        
        notificationRepository.save(notification);

        // Send email notification
        sendEmailNotification(owner.getEmail(), title, message);

        // Update match as notified
        match.setOwnerNotified(true);
        match.setNotificationSentAt(LocalDateTime.now());
    }

    /**
     * Notify finder that item is submitted to security desk
     */
    @Async
    public void notifyFinderItemSubmitted(User finder, String itemName, String referenceId) {
        String title = "Found Item Submitted";
        String message = String.format(
            "Thank you for submitting the found item '%s' to the security desk.\n" +
            "Reference ID: %s\n\n" +
            "We'll notify the owner if a match is found.",
            itemName,
            referenceId
        );

        Notification notification = new Notification();
        notification.setUser(finder);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(Notification.NotificationType.ITEM_SUBMITTED);
        notification.setIsRead(false);
        
        notificationRepository.save(notification);

        sendEmailNotification(finder.getEmail(), title, message);
    }

    /**
     * Notify owner that item is ready for collection
     */
    @Async
    public void notifyItemReadyForCollection(User owner, String itemName, String location) {
        String title = "Item Ready for Collection";
        String message = String.format(
            "Your item '%s' is ready for collection at %s.\n\n" +
            "Please bring your student ID for verification.\n" +
            "Collection hours: Mon-Fri, 9 AM - 5 PM",
            itemName,
            location
        );

        Notification notification = new Notification();
        notification.setUser(owner);
        notification.setTitle(title);
        notification.setMessage(message);
        notification.setType(Notification.NotificationType.ITEM_READY_FOR_COLLECTION);
        notification.setIsRead(false);
        
        notificationRepository.save(notification);

        sendEmailNotification(owner.getEmail(), title, message);
    }

    private void sendEmailNotification(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("noreply@foundit.ai");
            message.setTo(to);
            message.setSubject("[FoundIt AI] " + subject);
            message.setText(text);
            
            mailSender.send(message);
            System.out.println("Email sent to: " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }

    public List<Notification> getUserNotifications(User user) {
        return notificationRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public List<Notification> getUnreadNotifications(User user) {
        return notificationRepository.findByUserAndIsReadFalse(user);
    }

    public Long getUnreadCount(User user) {
        return notificationRepository.countUnreadNotifications(user);
    }

    @Transactional
    public void markAsRead(Long notificationId) {
        Notification notification = notificationRepository.findById(notificationId)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        
        notification.setIsRead(true);
        notification.setReadAt(LocalDateTime.now());
        notificationRepository.save(notification);
    }

    @Transactional
    public void markAllAsRead(User user) {
        List<Notification> unreadNotifications = notificationRepository.findByUserAndIsReadFalse(user);
        for (Notification notification : unreadNotifications) {
            notification.setIsRead(true);
            notification.setReadAt(LocalDateTime.now());
        }
        notificationRepository.saveAll(unreadNotifications);
    }
}
