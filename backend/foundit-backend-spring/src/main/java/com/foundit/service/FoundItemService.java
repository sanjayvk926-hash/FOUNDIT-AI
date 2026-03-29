package com.foundit.service;

import com.foundit.dto.FoundItemRequest;
import com.foundit.dto.FoundItemResponse;
import com.foundit.model.FoundItem;
import com.foundit.model.Location;
import com.foundit.model.LostItem;
import com.foundit.model.User;
import com.foundit.repository.FoundItemRepository;
import com.foundit.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class FoundItemService {

    @Autowired
    private FoundItemRepository foundItemRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ImageAnalysisService imageAnalysisService;

    @Autowired
    private MatchingService matchingService;

    @Transactional
    public FoundItemResponse reportFoundItem(FoundItemRequest request, User finder) {
        Location location = locationRepository.findById(request.getFoundLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        FoundItem foundItem = new FoundItem();
        foundItem.setItemName(request.getItemName());
        foundItem.setDescription(request.getDescription());
        foundItem.setImageUrl(request.getImageUrl());
        foundItem.setFoundLocation(location);
        foundItem.setFinder(finder);
        foundItem.setStatus(FoundItem.ItemStatus.PROCESSING);
        foundItem.setReferenceId(generateReferenceId("FND"));
        foundItem.setSubmittedToSecurity(false);

        // Call AI service for image analysis
        try {
            imageAnalysisService.analyzeImage(foundItem);
        } catch (Exception e) {
            System.err.println("Image analysis failed: " + e.getMessage());
            // Continue without AI analysis
        }

        foundItem = foundItemRepository.save(foundItem);

        // Trigger matching algorithm asynchronously
        try {
            matchingService.findMatches(foundItem);
        } catch (Exception e) {
            System.err.println("Matching failed: " + e.getMessage());
        }

        return convertToResponse(foundItem);
    }

    public List<FoundItemResponse> getAllFoundItems() {
        return foundItemRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<FoundItemResponse> getMyFoundItems(User finder) {
        return foundItemRepository.findByFinder(finder).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<FoundItemResponse> getUnmatchedItems() {
        return foundItemRepository.findUnmatchedItems().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<FoundItemResponse> getItemsAtSecurityDesk() {
        return foundItemRepository.findItemsAtSecurityDesk().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public FoundItemResponse getFoundItemById(Long id) {
        FoundItem foundItem = foundItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Found item not found"));
        return convertToResponse(foundItem);
    }

    @Transactional
    public void markAsSubmittedToSecurity(Long id, Long securityDeskLocationId) {
        FoundItem foundItem = foundItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Found item not found"));
        
        Location securityDesk = locationRepository.findById(securityDeskLocationId)
                .orElseThrow(() -> new RuntimeException("Security desk location not found"));

        foundItem.setSubmittedToSecurity(true);
        foundItem.setSecurityDeskLocation(securityDesk);
        foundItem.setStatus(FoundItem.ItemStatus.AT_SECURITY_DESK);
        foundItemRepository.save(foundItem);
    }

    @Transactional
    public void updateStatus(Long id, FoundItem.ItemStatus status) {
        FoundItem foundItem = foundItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Found item not found"));
        foundItem.setStatus(status);
        foundItemRepository.save(foundItem);
    }

    private FoundItemResponse convertToResponse(FoundItem item) {
        FoundItemResponse response = new FoundItemResponse();
        response.setId(item.getId());
        response.setItemName(item.getItemName());
        response.setDescription(item.getDescription());
        response.setImageUrl(item.getImageUrl());
        response.setFoundLocationName(item.getFoundLocation() != null ? 
                                      item.getFoundLocation().getName() : null);
        response.setFinderName(item.getFinder().getFullName());
        response.setDetectedCategory(item.getDetectedCategory() != null ? 
                                     item.getDetectedCategory().name() : null);
        response.setDetectedColor(item.getDetectedColor());
        response.setDetectedBrand(item.getDetectedBrand());
        response.setObjectType(item.getObjectType());
        response.setStatus(item.getStatus().name());
        response.setReferenceId(item.getReferenceId());
        response.setSubmittedToSecurity(item.getSubmittedToSecurity());
        response.setFoundAt(item.getFoundAt());
        response.setSecurityDeskLocation(item.getSecurityDeskLocation() != null ? 
                                        item.getSecurityDeskLocation().getName() : null);
        return response;
    }

    private String generateReferenceId(String prefix) {
        return prefix + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
