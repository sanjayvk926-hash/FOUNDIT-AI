package com.foundit.controller;

import com.foundit.model.ItemMatch;
import com.foundit.model.User;
import com.foundit.service.AuthService;
import com.foundit.service.MatchingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/matches")
@CrossOrigin(origins = "*")
public class MatchingController {

    @Autowired
    private MatchingService matchingService;

    @Autowired
    private AuthService authService;

    /**
     * Get matches for current user
     */
    @GetMapping("/my-matches")
    public ResponseEntity<List<ItemMatch>> getMyMatches(Authentication authentication) {
        User user = authService.getCurrentUser(authentication);
        List<ItemMatch> matches = matchingService.getMatchesForUser(user.getId());
        return ResponseEntity.ok(matches);
    }

    /**
     * Get all pending matches (Admin/Security)
     */
    @GetMapping("/pending")
    public ResponseEntity<List<ItemMatch>> getPendingMatches() {
        List<ItemMatch> matches = matchingService.getPendingMatches();
        return ResponseEntity.ok(matches);
    }

    /**
     * Confirm a match
     */
    @PostMapping("/{matchId}/confirm")
    public ResponseEntity<?> confirmMatch(@PathVariable Long matchId) {
        try {
            matchingService.confirmMatch(matchId);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Match confirmed successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }
}
