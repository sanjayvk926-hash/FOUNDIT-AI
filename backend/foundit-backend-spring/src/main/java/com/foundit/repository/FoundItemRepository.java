package com.foundit.repository;

import com.foundit.model.FoundItem;
import com.foundit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface FoundItemRepository extends JpaRepository<FoundItem, Long> {
    Optional<FoundItem> findByReferenceId(String referenceId);
    List<FoundItem> findByFinder(User finder);
    List<FoundItem> findByStatus(FoundItem.ItemStatus status);
    List<FoundItem> findByDetectedCategory(com.foundit.model.LostItem.ItemCategory category);
    List<FoundItem> findBySubmittedToSecurityTrue();
    List<FoundItem> findBySubmittedToSecurityFalse();
    
    @Query("SELECT f FROM FoundItem f WHERE f.status = 'SUBMITTED' OR f.status = 'PROCESSING'")
    List<FoundItem> findUnmatchedItems();
    
    @Query("SELECT f FROM FoundItem f WHERE f.foundAt >= :startDate")
    List<FoundItem> findRecentFinds(@Param("startDate") LocalDateTime startDate);
    
    @Query("SELECT f FROM FoundItem f WHERE f.status = 'AT_SECURITY_DESK' AND f.submittedToSecurity = true")
    List<FoundItem> findItemsAtSecurityDesk();
}
