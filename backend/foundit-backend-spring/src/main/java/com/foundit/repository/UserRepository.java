package com.foundit.repository;

import com.foundit.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByStudentId(String studentId);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean existsByStudentId(String studentId);
    List<User> findByRole(User.UserRole role);
    List<User> findByEnabledTrue();
}
