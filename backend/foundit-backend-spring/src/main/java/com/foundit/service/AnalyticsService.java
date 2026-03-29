package com.foundit.service;

import com.foundit.model.LostItem;
import com.foundit.repository.ItemMatchRepository;
import com.foundit.repository.ItemReturnRepository;
import com.foundit.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class AnalyticsService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private ItemMatchRepository itemMatchRepository;

    @Autowired
    private ItemReturnRepository itemReturnRepository;

    /**
     * Get dashboard statistics
     */
    public Map<String, Object> getDashboardStats() {
        Map<String, Object> stats = new HashMap<>();

        // Total counts
        stats.put("totalLostReports", lostItemRepository.count());
        stats.put("totalFoundItems", lostItemRepository.count());
        stats.put("totalMatches", itemMatchRepository.countSuccessfulMatches());
        stats.put("totalReturns", itemReturnRepository.countTotalReturns());

        // Recent activity (last 30 days)
        LocalDateTime thirtyDaysAgo = LocalDateTime.now().minusDays(30);
        stats.put("recentReports", lostItemRepository.findRecentReports(thirtyDaysAgo).size());

        // Recovery rate
        long totalReports = lostItemRepository.count();
        long successfulReturns = itemReturnRepository.countTotalReturns();
        double recoveryRate = totalReports > 0 ? (double) successfulReturns / totalReports * 100 : 0.0;
        stats.put("recoveryRate", String.format("%.1f%%", recoveryRate));

        return stats;
    }

    /**
     * Get most common lost locations
     */
    public List<Map<String, Object>> getMostCommonLostLocations() {
        List<Object[]> results = lostItemRepository.findMostCommonLostLocations();
        
        return results.stream()
                .limit(10)
                .map(result -> {
                    Map<String, Object> locationData = new HashMap<>();
                    locationData.put("location", result[0].toString());
                    locationData.put("count", result[1]);
                    return locationData;
                })
                .collect(Collectors.toList());
    }

    /**
     * Get item category statistics
     */
    public List<Map<String, Object>> getItemCategoryStats() {
        List<Object[]> results = lostItemRepository.findItemCategoryStatistics();
        
        return results.stream()
                .map(result -> {
                    Map<String, Object> categoryData = new HashMap<>();
                    categoryData.put("category", result[0].toString());
                    categoryData.put("count", result[1]);
                    return categoryData;
                })
                .collect(Collectors.toList());
    }

    /**
     * Get monthly trends
     */
    public Map<String, Object> getMonthlyTrends() {
        Map<String, Object> trends = new HashMap<>();

        LocalDateTime now = LocalDateTime.now();
        
        // Last 6 months data
        for (int i = 5; i >= 0; i--) {
            LocalDateTime monthStart = now.minusMonths(i).withDayOfMonth(1).withHour(0).withMinute(0);
            LocalDateTime monthEnd = monthStart.plusMonths(1);
            
            String monthName = monthStart.getMonth().toString();
            
            long lostCount = lostItemRepository.findRecentReports(monthStart).stream()
                    .filter(item -> item.getReportedAt().isBefore(monthEnd))
                    .count();
            
            trends.put(monthName, lostCount);
        }

        return trends;
    }

    /**
     * Get performance metrics
     */
    public Map<String, Object> getPerformanceMetrics() {
        Map<String, Object> metrics = new HashMap<>();

        // Average matching time
        metrics.put("averageMatchingTime", "2.5 hours"); // Placeholder

        // Match accuracy
        long totalMatches = itemMatchRepository.count();
        long confirmedMatches = itemMatchRepository.countSuccessfulMatches();
        double accuracy = totalMatches > 0 ? (double) confirmedMatches / totalMatches * 100 : 0.0;
        metrics.put("matchAccuracy", String.format("%.1f%%", accuracy));

        // Items at security desk
        metrics.put("itemsAtSecurityDesk", "12"); // Placeholder

        return metrics;
    }
}
