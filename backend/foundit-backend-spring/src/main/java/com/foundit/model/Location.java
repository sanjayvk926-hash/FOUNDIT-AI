package com.foundit.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "locations")
public class Location {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false, unique = true)
    private String name;
    
    private String description;
    
    @Enumerated(EnumType.STRING)
    private LocationType type;
    
    private String building;
    
    private String floor;
    
    private Boolean active = true;
    
    public enum LocationType {
        LIBRARY, CANTEEN, CLASSROOM, PARKING, HOSTEL, SPORTS_COMPLEX, AUDITORIUM, LAB, OFFICE, GARDEN, OTHER
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public LocationType getType() { return type; }
    public void setType(LocationType type) { this.type = type; }
    public String getBuilding() { return building; }
    public void setBuilding(String building) { this.building = building; }
    public String getFloor() { return floor; }
    public void setFloor(String floor) { this.floor = floor; }
    public Boolean getActive() { return active; }
    public void setActive(Boolean active) { this.active = active; }

    public Location() {}
    public Location(Long id, String name, String description, LocationType type, String building, String floor, Boolean active) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.type = type;
        this.building = building;
        this.floor = floor;
        this.active = active;
    }
}
