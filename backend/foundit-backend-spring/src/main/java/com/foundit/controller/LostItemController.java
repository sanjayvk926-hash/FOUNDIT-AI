package com.foundit.controller;

import com.foundit.dto.LostItemRequest;
import com.foundit.dto.LostItemResponse;
import com.foundit.model.User;
import com.foundit.service.AuthService;
import com.foundit.service.LostItemService;
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
@RequestMapping("/lost-items")
@CrossOrigin(origins = "*")
public class LostItemController {

    @Autowired
    private LostItemService lostItemService;

    @Autowired
    private AuthService authService;

    /**
     * Report a lost item
     */
    @PostMapping
    public ResponseEntity<?> reportLostItem(@Valid @RequestBody LostItemRequest request,
                                           Authentication authentication) {
        try {
            User owner = authService.getCurrentUser(authentication);
            LostItemResponse response = lostItemService.reportLostItem(request, owner);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Get all lost items
     */
    @GetMapping
    public ResponseEntity<List<LostItemResponse>> getAllLostItems() {
        List<LostItemResponse> items = lostItemService.getAllLostItems();
        return ResponseEntity.ok(items);
    }

    /**
     * Get my lost items
     */
    @GetMapping("/my-items")
    public ResponseEntity<List<LostItemResponse>> getMyLostItems(Authentication authentication) {
        User owner = authService.getCurrentUser(authentication);
        List<LostItemResponse> items = lostItemService.getMyLostItems(owner);
        return ResponseEntity.ok(items);
    }

    /**
     * Get active lost item reports
     */
    @GetMapping("/active")
    public ResponseEntity<List<LostItemResponse>> getActiveReports() {
        List<LostItemResponse> items = lostItemService.getActiveReports();
        return ResponseEntity.ok(items);
    }

    /**
     * Get lost item by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getLostItemById(@PathVariable Long id) {
        try {
            LostItemResponse item = lostItemService.getLostItemById(id);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    /**
     * Get lost item by reference ID
     */
    @GetMapping("/reference/{referenceId}")
    public ResponseEntity<?> getLostItemByReferenceId(@PathVariable String referenceId) {
        try {
            LostItemResponse item = lostItemService.getLostItemByReferenceId(referenceId);
            return ResponseEntity.ok(item);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
        }
    }

    /**
     * Update lost item status
     */
    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, 
                                         @RequestParam String status) {
        try {
            lostItemService.updateStatus(id, 
                com.foundit.model.LostItem.ItemStatus.valueOf(status.toUpperCase()));
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
