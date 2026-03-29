package com.foundit.controller;

import com.foundit.service.AnalyticsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/analytics")
@CrossOrigin(origins = "*")
@PreAuthorize("hasRole('ADMIN')")
public class AnalyticsController {

    @Autowired
    private AnalyticsService analyticsService;

    /**
     * Get dashboard statistics
     */
    @GetMapping("/dashboard")
    public ResponseEntity<Map<String, Object>> getDashboardStats() {
        Map<String, Object> stats = analyticsService.getDashboardStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get most common lost locations
     */
    @GetMapping("/locations/common")
    public ResponseEntity<List<Map<String, Object>>> getMostCommonLostLocations() {
        List<Map<String, Object>> locations = analyticsService.getMostCommonLostLocations();
        return ResponseEntity.ok(locations);
    }

    /**
     * Get item category statistics
     */
    @GetMapping("/categories")
    public ResponseEntity<List<Map<String, Object>>> getItemCategoryStats() {
        List<Map<String, Object>> categories = analyticsService.getItemCategoryStats();
        return ResponseEntity.ok(categories);
    }

    /**
     * Get monthly trends
     */
    @GetMapping("/trends/monthly")
    public ResponseEntity<Map<String, Object>> getMonthlyTrends() {
        Map<String, Object> trends = analyticsService.getMonthlyTrends();
        return ResponseEntity.ok(trends);
    }

    /**
     * Get performance metrics
     */
    @GetMapping("/performance")
    public ResponseEntity<Map<String, Object>> getPerformanceMetrics() {
        Map<String, Object> metrics = analyticsService.getPerformanceMetrics();
        return ResponseEntity.ok(metrics);
    }
}
