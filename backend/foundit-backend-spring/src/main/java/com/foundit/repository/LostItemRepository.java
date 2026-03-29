package com.foundit.repository;

import com.foundit.model.LostItem;
import com.foundit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface LostItemRepository extends JpaRepository<LostItem, Long> {
    Optional<LostItem> findByReferenceId(String referenceId);
    List<LostItem> findByOwner(User owner);
    List<LostItem> findByStatus(LostItem.ItemStatus status);
    List<LostItem> findByCategory(LostItem.ItemCategory category);
    List<LostItem> findByOwnerAndStatus(User owner, LostItem.ItemStatus status);
    
    @Query("SELECT l FROM LostItem l WHERE l.status = 'REPORTED' OR l.status = 'MATCHED'")
    List<LostItem> findActiveReports();
    
    @Query("SELECT l FROM LostItem l WHERE l.reportedAt >= :startDate")
    List<LostItem> findRecentReports(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT l.category, COUNT(l) FROM LostItem l GROUP BY l.category ORDER BY COUNT(l) DESC")
    List<Object[]> findItemCategoryStatistics();
    
    @Query("SELECT l.lastSeenLocation, COUNT(l) FROM LostItem l WHERE l.lastSeenLocation IS NOT NULL GROUP BY l.lastSeenLocation ORDER BY COUNT(l) DESC")
    List<Object[]> findMostCommonLostLocations();
}
