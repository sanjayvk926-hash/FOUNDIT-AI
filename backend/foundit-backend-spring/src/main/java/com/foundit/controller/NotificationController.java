package com.foundit.controller;

import com.foundit.model.Notification;
import com.foundit.model.User;
import com.foundit.service.AuthService;
import com.foundit.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "*")
public class NotificationController {

    @Autowired
    private NotificationService notificationService;

    @Autowired
    private AuthService authService;

    /**
     * Get all notifications for current user
     */
    @GetMapping
    public ResponseEntity<List<Notification>> getMyNotifications(Authentication authentication) {
        User user = authService.getCurrentUser(authentication);
        List<Notification> notifications = notificationService.getUserNotifications(user);
        return ResponseEntity.ok(notifications);
    }

    /**
     * Get unread notifications
     */
    @GetMapping("/unread")
    public ResponseEntity<List<Notification>> getUnreadNotifications(Authentication authentication) {
        User user = authService.getCurrentUser(authentication);
        List<Notification> notifications = notificationService.getUnreadNotifications(user);
        return ResponseEntity.ok(notifications);
    }

    /**
     * Get unread notification count
     */
    @GetMapping("/unread/count")
    public ResponseEntity<?> getUnreadCount(Authentication authentication) {
        User user = authService.getCurrentUser(authentication);
        Long count = notificationService.getUnreadCount(user);
        
        Map<String, Long> response = new HashMap<>();
        response.put("unreadCount", count);
        return ResponseEntity.ok(response);
    }

    /**
     * Mark notification as read
     */
    @PatchMapping("/{id}/read")
    public ResponseEntity<?> markAsRead(@PathVariable Long id) {
        try {
            notificationService.markAsRead(id);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Notification marked as read");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Mark all notifications as read
     */
    @PatchMapping("/read-all")
    public ResponseEntity<?> markAllAsRead(Authentication authentication) {
        User user = authService.getCurrentUser(authentication);
        notificationService.markAllAsRead(user);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", "All notifications marked as read");
        return ResponseEntity.ok(response);
    }
}
