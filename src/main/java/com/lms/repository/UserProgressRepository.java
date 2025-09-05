package com.lms.repository;

import com.lms.entity.UserProgress;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserProgressRepository extends JpaRepository<UserProgress, Long> {
    List<UserProgress> findByUserId(Long userId);
    List<UserProgress> findByUserIdAndContentCourseId(Long userId, Long courseId);
    Optional<UserProgress> findByUserIdAndContentId(Long userId, Long contentId);
}
