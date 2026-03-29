package com.foundit.controller;

import com.foundit.dto.FoundItemRequest;
import com.foundit.dto.FoundItemResponse;
import com.foundit.model.User;
import com.foundit.service.AuthService;
import com.foundit.service.FoundItemService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/found-items")
@CrossOrigin(origins = "*")
public class FoundItemController {

    @Autowired
    private FoundItemService foundItemService;

    @Autowired
    private AuthService authService;

    /**
     * Report a found item
     */
    @PostMapping
    public ResponseEntity<?> reportFoundItem(@Valid @RequestBody FoundItemRequest request,
                                            Authentication authentication) {
        try {
            User finder = authService.getCurrentUser(authentication);
            FoundItemResponse response = foundItemService.reportFoundItem(request, finder);
            
            Map<String, Object> result = new HashMap<>();
            result.put("message", "Item reported successfully. Please submit it to the campus security desk.");
            result.put("item", response);
            
            return ResponseEntity.status(HttpStatus.CREATED).body(result);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get all found items
     */
    @GetMapping
    public ResponseEntity<List<FoundItemResponse>> getAllFoundItems() {
        List<FoundItemResponse> items = foundItemService.getAllFoundItems();
        return ResponseEntity.ok(items);
    }

    /**
     * Get my found items
     */
    @GetMapping("/my-items")
    public ResponseEntity<List<FoundItemResponse>> getMyFoundItems(Authentication authentication) {
        User finder = authService.getCurrentUser(authentication);
        List<FoundItemResponse> items = foundItemService.getMyFoundItems(finder);
        return ResponseEntity.ok(items);
    }

    /**
     * Get unmatched found items
     */
    @GetMapping("/unmatched")
    public ResponseEntity<List<FoundItemResponse>> getUnmatchedItems() {
        List<FoundItemResponse> items = foundItemService.getUnmatchedItems();
        return ResponseEntity.ok(items);
    }

    /**
     * Get items at security desk
     */
    @GetMapping("/at-security-desk")
    public ResponseEntity<List<FoundItemResponse>> getItemsAtSecurityDesk() {
        List<FoundItemResponse> items = foundItemService.getItemsAtSecurityDesk();
        return ResponseEntity.ok(items);
    }

    /**
     * Get found item by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getFoundItemById(@PathVariable Long id) {
        try {
            FoundItemResponse item = foundItemService.getFoundItemById(id);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    /**
     * Mark item as submitted to security desk
     */
    @PostMapping("/{id}/submit-to-security")
    public ResponseEntity<?> submitToSecurity(@PathVariable Long id, 
                                             @RequestParam Long securityDeskLocationId) {
        try {
            foundItemService.markAsSubmittedToSecurity(id, securityDeskLocationId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Item marked as submitted to security desk");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Update found item status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, 
                                         @RequestParam String status) {
        try {
            foundItemService.updateStatus(id, 
                com.foundit.model.FoundItem.ItemStatus.valueOf(status.toUpperCase()));
            Map<String, String> response = new HashMap<>();
            response.put("message", "Status updated successfully");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
