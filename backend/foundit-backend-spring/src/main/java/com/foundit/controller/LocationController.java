package com.foundit.controller;

import com.foundit.model.Location;
import com.foundit.repository.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/locations")
@CrossOrigin(origins = "*")
public class LocationController {

    @Autowired
    private LocationRepository locationRepository;

    /**
     * Get all locations
     */
    @GetMapping
    public ResponseEntity<List<Location>> getAllLocations() {
        List<Location> locations = locationRepository.findAll();
        return ResponseEntity.ok(locations);
    }

    /**
     * Get active locations
     */
    @GetMapping("/active")
    public ResponseEntity<List<Location>> getActiveLocations() {
        List<Location> locations = locationRepository.findByActiveTrue();
        return ResponseEntity.ok(locations);
    }

    /**
     * Get location by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<?> getLocationById(@PathVariable Long id) {
        return locationRepository.findById(id)
                .map(location -> ResponseEntity.ok((Object) location))
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Location not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                });
    }

    /**
     * Get locations by type
     */
    @GetMapping("/type/{type}")
    public ResponseEntity<List<Location>> getLocationsByType(@PathVariable String type) {
        try {
            Location.LocationType locationType = Location.LocationType.valueOf(type.toUpperCase());
            List<Location> locations = locationRepository.findByType(locationType);
            return ResponseEntity.ok(locations);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    /**
     * Create a new location (Admin only)
     */
    @PostMapping
    public ResponseEntity<?> createLocation(@RequestBody Location location) {
        try {
            Location savedLocation = locationRepository.save(location);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedLocation);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", "Failed to create location: " + e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    /**
     * Update location (Admin only)
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateLocation(@PathVariable Long id, @RequestBody Location locationDetails) {
        return locationRepository.findById(id)
                .map(location -> {
                    location.setName(locationDetails.getName());
                    location.setDescription(locationDetails.getDescription());
                    location.setType(locationDetails.getType());
                    location.setBuilding(locationDetails.getBuilding());
                    location.setFloor(locationDetails.getFloor());
                    location.setActive(locationDetails.getActive());
                    
                    Location updatedLocation = locationRepository.save(location);
                    return ResponseEntity.ok((Object) updatedLocation);
                })
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Location not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                });
    }

    /**
     * Delete location (Admin only)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLocation(@PathVariable Long id) {
        return locationRepository.findById(id)
                .map(location -> {
                    locationRepository.delete(location);
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Location deleted successfully");
                    return ResponseEntity.ok((Object) response);
                })
                .orElseGet(() -> {
                    Map<String, String> error = new HashMap<>();
                    error.put("error", "Location not found");
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
                });
    }
}
