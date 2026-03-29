package com.foundit.repository;

import com.foundit.model.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface LocationRepository extends JpaRepository<Location, Long> {
    Optional<Location> findByName(String name);
    List<Location> findByType(Location.LocationType type);
    List<Location> findByActiveTrue();
    List<Location> findByBuilding(String building);
}
