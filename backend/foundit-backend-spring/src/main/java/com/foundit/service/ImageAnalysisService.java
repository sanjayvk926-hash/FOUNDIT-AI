package com.foundit.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.foundit.model.FoundItem;
import com.foundit.model.LostItem;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Service to communicate with Python backend for YOLO and OpenCV image analysis
 */
@Service
public class ImageAnalysisService {

    @Value("${python.service.url}")
    private String pythonServiceUrl;

    @Value("${python.service.enabled}")
    private boolean pythonServiceEnabled;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    /**
     * Analyze image using YOLO for object detection and OpenCV for feature extraction
     */
    public void analyzeImage(FoundItem foundItem) {
        if (!pythonServiceEnabled || foundItem.getImageUrl() == null) {
            System.out.println("Python service disabled or no image. Skipping image analysis.");
            return;
        }

        try {
            // Prepare request payload
            Map<String, String> payload = new HashMap<>();
            payload.put("image_url", foundItem.getImageUrl());
            payload.put("item_id", foundItem.getId().toString());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

            // Call Python service
            String url = pythonServiceUrl + "/analyze";
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                // Parse response
                JsonNode result = objectMapper.readTree(response.getBody());
                
                // Extract YOLO results
                if (result.has("object_type")) {
                    foundItem.setObjectType(result.get("object_type").asText());
                }
                
                // Extract detected attributes
                if (result.has("color")) {
                    foundItem.setDetectedColor(result.get("color").asText());
                }
                
                if (result.has("category")) {
                    try {
                        foundItem.setDetectedCategory(
                            LostItem.ItemCategory.valueOf(result.get("category").asText().toUpperCase())
                        );
                    } catch (IllegalArgumentException e) {
                        // Category not recognized
                    }
                }
                
                if (result.has("brand")) {
                    foundItem.setDetectedBrand(result.get("brand").asText());
                }
                
                // Store image features for similarity matching
                if (result.has("features")) {
                    foundItem.setImageFeatures(result.get("features").toString());
                }
                
                System.out.println("Image analysis successful for found item: " + foundItem.getReferenceId());
            }
        } catch (Exception e) {
            System.err.println("Error analyzing found item image: " + e.getMessage());
            // Don't throw exception to avoid breaking the main flow
        }
    }

    /**
     * Analyze lost item image to extract features for matching
     */
    public void analyzeLostItem(LostItem lostItem) {
        if (!pythonServiceEnabled || lostItem.getImageUrl() == null) {
            return;
        }

        try {
            Map<String, String> payload = new HashMap<>();
            payload.put("image_url", lostItem.getImageUrl());
            payload.put("item_id", "LOST_" + lostItem.getId());

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

            String url = pythonServiceUrl + "/analyze";
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode result = objectMapper.readTree(response.getBody());
                
                if (result.has("features")) {
                    lostItem.setImageFeatures(result.get("features").toString());
                }
                
                System.out.println("Image analysis successful for lost item: " + lostItem.getReferenceId());
            }
        } catch (Exception e) {
            System.err.println("Error analyzing lost item image: " + e.getMessage());
        }
    }

    /**
     * Calculate image similarity between two items
     */
    public double calculateImageSimilarity(String imageFeatures1, String imageFeatures2) {
        if (!pythonServiceEnabled || imageFeatures1 == null || imageFeatures2 == null) {
            return 0.0;
        }

        try {
            Map<String, String> payload = new HashMap<>();
            payload.put("features1", imageFeatures1);
            payload.put("features2", imageFeatures2);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            
            HttpEntity<Map<String, String>> request = new HttpEntity<>(payload, headers);

            String url = pythonServiceUrl + "/similarity";
            ResponseEntity<String> response = restTemplate.postForEntity(url, request, String.class);

            if (response.getStatusCode() == HttpStatus.OK) {
                JsonNode result = objectMapper.readTree(response.getBody());
                return result.get("similarity").asDouble();
            }
        } catch (Exception e) {
            System.err.println("Error calculating similarity: " + e.getMessage());
        }

        return 0.0;
    }
}
