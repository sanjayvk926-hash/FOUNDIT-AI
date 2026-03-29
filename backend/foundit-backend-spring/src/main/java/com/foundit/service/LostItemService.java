package com.foundit.service;

import com.foundit.dto.LostItemRequest;
import com.foundit.dto.LostItemResponse;
import com.foundit.model.Location;
import com.foundit.model.LostItem;
import com.foundit.model.User;
import com.foundit.repository.LocationRepository;
import com.foundit.repository.LostItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class LostItemService {

    @Autowired
    private LostItemRepository lostItemRepository;

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private ImageAnalysisService imageAnalysisService;

    @Transactional
    public LostItemResponse reportLostItem(LostItemRequest request, User owner) {
        Location location = locationRepository.findById(request.getLastSeenLocationId())
                .orElseThrow(() -> new RuntimeException("Location not found"));

        LostItem lostItem = new LostItem();
        lostItem.setItemName(request.getItemName());
        lostItem.setDescription(request.getDescription());
        lostItem.setCategory(LostItem.ItemCategory.valueOf(request.getCategory().toUpperCase()));
        lostItem.setColor(request.getColor());
        lostItem.setBrand(request.getBrand());
        lostItem.setLastSeenLocation(location);
        lostItem.setLastSeenTime(request.getLastSeenTime());
        lostItem.setOwner(owner);
        lostItem.setImageUrl(request.getImageUrl());
        lostItem.setStatus(LostItem.ItemStatus.REPORTED);
        lostItem.setReferenceId(generateReferenceId("LST"));

        lostItem = lostItemRepository.save(lostItem);

        // Analyze image if provided
        if (lostItem.getImageUrl() != null) {
            imageAnalysisService.analyzeLostItem(lostItem);
            lostItem = lostItemRepository.save(lostItem); // Save updated features
        }

        return convertToResponse(lostItem);
    }

    public List<LostItemResponse> getAllLostItems() {
        return lostItemRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<LostItemResponse> getMyLostItems(User owner) {
        return lostItemRepository.findByOwner(owner).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public List<LostItemResponse> getActiveReports() {
        return lostItemRepository.findActiveReports().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public LostItemResponse getLostItemById(Long id) {
        LostItem lostItem = lostItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));
        return convertToResponse(lostItem);
    }

    public LostItemResponse getLostItemByReferenceId(String referenceId) {
        LostItem lostItem = lostItemRepository.findByReferenceId(referenceId)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));
        return convertToResponse(lostItem);
    }

    @Transactional
    public void updateStatus(Long id, LostItem.ItemStatus status) {
        LostItem lostItem = lostItemRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Lost item not found"));
        lostItem.setStatus(status);
        lostItemRepository.save(lostItem);
    }

    private LostItemResponse convertToResponse(LostItem item) {
        LostItemResponse response = new LostItemResponse();
        response.setId(item.getId());
        response.setItemName(item.getItemName());
        response.setDescription(item.getDescription());
        response.setCategory(item.getCategory().name());
        response.setColor(item.getColor());
        response.setBrand(item.getBrand());
        response.setLastSeenLocationName(item.getLastSeenLocation() != null ? 
                                         item.getLastSeenLocation().getName() : null);
        response.setLastSeenTime(item.getLastSeenTime());
        response.setOwnerName(item.getOwner().getFullName());
        response.setOwnerEmail(item.getOwner().getEmail());
        response.setImageUrl(item.getImageUrl());
        response.setStatus(item.getStatus().name());
        response.setReferenceId(item.getReferenceId());
        response.setReportedAt(item.getReportedAt());
        return response;
    }

    private String generateReferenceId(String prefix) {
        return prefix + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }
}
