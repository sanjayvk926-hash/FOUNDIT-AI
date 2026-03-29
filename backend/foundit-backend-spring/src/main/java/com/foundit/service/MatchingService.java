package com.foundit.service;

import com.foundit.model.FoundItem;
import com.foundit.model.ItemMatch;
import com.foundit.model.LostItem;
import com.foundit.repository.FoundItemRepository;
import com.foundit.repository.ItemMatchRepository;
import com.foundit.repository.LostItemRepository;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class MatchingService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private FoundItemRepository foundItemRepository;

    @Autowired
    private ItemMatchRepository itemMatchRepository;

    @Autowired
    private ImageAnalysisService imageAnalysisService;

    @Autowired
    private NotificationService notificationService;

    @Value("${matching.threshold}")
    private double matchingThreshold;

    @Value("${matching.image-weight}")
    private double imageWeight;

    @Value("${matching.object-type-weight}")
    private double objectTypeWeight;

    @Value("${matching.color-weight}")
    private double colorWeight;

    @Value("${matching.description-weight}")
    private double descriptionWeight;

    /**
     * Find potential matches for a found item
     */
    @Async
    @Transactional
    public void findMatches(FoundItem foundItem) {
        // Get all active lost item reports
        List<LostItem> activeLostItems = lostItemRepository.findActiveReports();

        List<ItemMatch> potentialMatches = new ArrayList<>();

        for (LostItem lostItem : activeLostItems) {
            double matchScore = calculateMatchScore(foundItem, lostItem);

            if (matchScore >= matchingThreshold) {
                ItemMatch match = createMatch(foundItem, lostItem, matchScore);
                potentialMatches.add(match);
                itemMatchRepository.save(match);
            }
        }

        // If high-confidence matches found, notify owner
        if (!potentialMatches.isEmpty()) {
            ItemMatch bestMatch = potentialMatches.stream()
                    .max(Comparator.comparingDouble(ItemMatch::getMatchScore))
                    .orElse(null);

            if (bestMatch != null && bestMatch.getMatchScore() >= 0.75) {
                notificationService.notifyOwnerOfMatch(bestMatch);
                
                // Update statuses
                foundItem.setStatus(FoundItem.ItemStatus.MATCHED);
                foundItemRepository.save(foundItem);
                
                LostItem lostItem = bestMatch.getLostItem();
                lostItem.setStatus(LostItem.ItemStatus.MATCHED);
                lostItemRepository.save(lostItem);
            }
        }

        System.out.println("Matching completed for " + foundItem.getReferenceId() + 
                         ". Found " + potentialMatches.size() + " potential matches.");
    }

    /**
     * Calculate overall match score using weighted algorithm
     */
    private double calculateMatchScore(FoundItem foundItem, LostItem lostItem) {
        // 1. Image Similarity Score
        double imageSimilarity = 0.0;
        if (foundItem.getImageFeatures() != null && lostItem.getImageFeatures() != null) {
            imageSimilarity = imageAnalysisService.calculateImageSimilarity(
                foundItem.getImageFeatures(), 
                lostItem.getImageFeatures()
            );
        }

        // 2. Object Type Match Score
        double objectTypeScore = calculateObjectTypeScore(foundItem, lostItem);

        // 3. Color Match Score
        double colorScore = calculateColorScore(foundItem, lostItem);

        // 4. Description Similarity Score
        double descriptionScore = calculateDescriptionSimilarity(
            foundItem.getDescription(), 
            lostItem.getDescription()
        );

        // Calculate weighted overall score
        double overallScore = 
            (imageWeight * imageSimilarity) +
            (objectTypeWeight * objectTypeScore) +
            (colorWeight * colorScore) +
            (descriptionWeight * descriptionScore);

        return overallScore;
    }

    private double calculateObjectTypeScore(FoundItem foundItem, LostItem lostItem) {
        if (foundItem.getDetectedCategory() == null || lostItem.getCategory() == null) {
            return 0.0;
        }

        return foundItem.getDetectedCategory().equals(lostItem.getCategory()) ? 1.0 : 0.0;
    }

    private double calculateColorScore(FoundItem foundItem, LostItem lostItem) {
        String foundColor = foundItem.getDetectedColor();
        String lostColor = lostItem.getColor();

        if (foundColor == null || lostColor == null) {
            return 0.0;
        }

        // Exact match
        if (foundColor.equalsIgnoreCase(lostColor)) {
            return 1.0;
        }

        // Partial match
        if (foundColor.toLowerCase().contains(lostColor.toLowerCase()) ||
            lostColor.toLowerCase().contains(foundColor.toLowerCase())) {
            return 0.7;
        }

        return 0.0;
    }

    private double calculateDescriptionSimilarity(String desc1, String desc2) {
        if (desc1 == null || desc2 == null) {
            return 0.0;
        }

        // Simple keyword matching
        String[] words1 = desc1.toLowerCase().split("\\s+");
        String[] words2 = desc2.toLowerCase().split("\\s+");

        int commonWords = 0;
        for (String word1 : words1) {
            for (String word2 : words2) {
                if (word1.equals(word2) && word1.length() > 3) {
                    commonWords++;
                }
            }
        }

        double maxWords = Math.max(words1.length, words2.length);
        return maxWords > 0 ? (double) commonWords / maxWords : 0.0;
    }

    private ItemMatch createMatch(FoundItem foundItem, LostItem lostItem, double matchScore) {
        ItemMatch match = new ItemMatch();
        match.setFoundItem(foundItem);
        match.setLostItem(lostItem);
        match.setMatchScore(matchScore);
        match.setStatus(ItemMatch.MatchStatus.PENDING);
        match.setOwnerNotified(false);

        // Store individual scores for transparency
        match.setObjectTypeScore(calculateObjectTypeScore(foundItem, lostItem));
        match.setColorScore(calculateColorScore(foundItem, lostItem));
        match.setDescriptionScore(calculateDescriptionSimilarity(
            foundItem.getDescription(), 
            lostItem.getDescription()
        ));

        return match;
    }

    public List<ItemMatch> getMatchesForUser(Long userId) {
        return itemMatchRepository.findMatchesForUser(userId);
    }

    public List<ItemMatch> getPendingMatches() {
        return itemMatchRepository.findByStatus(ItemMatch.MatchStatus.PENDING);
    }

    @Transactional
    public void confirmMatch(Long matchId) {
        ItemMatch match = itemMatchRepository.findById(matchId)
                .orElseThrow(() -> new RuntimeException("Match not found"));
        
        match.setStatus(ItemMatch.MatchStatus.CONFIRMED);
        itemMatchRepository.save(match);

        // Update item statuses
        match.getLostItem().setStatus(LostItem.ItemStatus.FOUND);
        lostItemRepository.save(match.getLostItem());

        match.getFoundItem().setStatus(FoundItem.ItemStatus.MATCHED);
        foundItemRepository.save(match.getFoundItem());
    }
}
