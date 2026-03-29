package com.foundit.repository;

import com.foundit.model.ItemReturn;
import com.foundit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ItemReturnRepository extends JpaRepository<ItemReturn, Long> {
    List<ItemReturn> findByOwner(User owner);
    List<ItemReturn> findByVerifiedBy(User verifiedBy);
    
    @Query("SELECT COUNT(r) FROM ItemReturn r")
    Long countTotalReturns();
    
    @Query("SELECT r FROM ItemReturn r WHERE r.collectedAt >= :startDate")
    List<ItemReturn> findReturnsSince(LocalDateTime startDate);
}
