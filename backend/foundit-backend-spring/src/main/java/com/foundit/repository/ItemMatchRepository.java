package com.foundit.repository;

import com.foundit.model.FoundItem;
import com.foundit.model.ItemMatch;
import com.foundit.model.LostItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ItemMatchRepository extends JpaRepository<ItemMatch, Long> {
    List<ItemMatch> findByLostItem(LostItem lostItem);
    List<ItemMatch> findByFoundItem(FoundItem foundItem);
    List<ItemMatch> findByStatus(ItemMatch.MatchStatus status);
    List<ItemMatch> findByOwnerNotifiedFalse();
    
    @Query("SELECT m FROM ItemMatch m WHERE m.lostItem.owner.id = :userId ORDER BY m.matchScore DESC")
    List<ItemMatch> findMatchesForUser(@Param("userId") Long userId);
    
    @Query("SELECT m FROM ItemMatch m WHERE m.matchScore >= :threshold AND m.status = 'PENDING'")
    List<ItemMatch> findHighConfidenceMatches(@Param("threshold") Double threshold);
    
    @Query("SELECT COUNT(m) FROM ItemMatch m WHERE m.status = 'CONFIRMED'")
    Long countSuccessfulMatches();
    
    @Query("SELECT m FROM ItemMatch m WHERE m.lostItem = :lostItem AND m.foundItem = :foundItem")
    ItemMatch findByLostItemAndFoundItem(@Param("lostItem") LostItem lostItem, @Param("foundItem") FoundItem foundItem);
}
