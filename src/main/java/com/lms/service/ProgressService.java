package com.lms.service;

import com.lms.entity.UserProgress;
import com.lms.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProgressService {

    @Autowired
    private UserProgressRepository progressRepository;

    public void markContentAsViewed(Long userId, Long contentId) {
        progressRepository.findByUserIdAndContentId(userId, contentId)
            .ifPresentOrElse(
                progress -> {
                    // Update existing progress
                    progress.setLastAccessed(java.time.LocalDateTime.now().toString());
                    progressRepository.save(progress);
                },
                () -> {
                    // Create new progress record
                    UserProgress progress = new UserProgress();
                    progress.setUserId(userId);
                    progress.setContentId(contentId);
                    progress.setLastAccessed(java.time.LocalDateTime.now().toString());
                    progress.setCompleted(false);
                    progress.setProgressPercentage(0);
                    progressRepository.save(progress);
                }
            );
    }

    public void markContentAsCompleted(Long userId, Long contentId) {
        progressRepository.findByUserIdAndContentId(userId, contentId)
            .ifPresent(progress -> {
                progress.setCompleted(true);
                progress.setProgressPercentage(100);
                progressRepository.save(progress);
            });
    }
}
