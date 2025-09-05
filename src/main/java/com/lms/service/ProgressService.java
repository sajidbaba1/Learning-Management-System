package com.lms.service;

import com.lms.entity.UserProgress;
import com.lms.entity.User;
import com.lms.entity.Content;
import com.lms.repository.UserProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ProgressService {

    @Autowired
    private UserProgressRepository progressRepository;

    public void markContentAsViewed(User user, Content content) {
        progressRepository.findByUserIdAndContentId(user.getId(), content.getId())
            .ifPresentOrElse(
                progress -> {
                    progress.setLastAccessed(LocalDateTime.now().toString());
                    progressRepository.save(progress);
                },
                () -> {
                    UserProgress progress = new UserProgress();
                    progress.setUser(user);
                    progress.setContent(content);
                    progress.setLastAccessed(LocalDateTime.now().toString());
                    progress.setCompleted(false);
                    progress.setProgressPercentage(0);
                    progressRepository.save(progress);
                }
            );
    }

    public void markContentAsCompleted(User user, Content content) {
        progressRepository.findByUserIdAndContentId(user.getId(), content.getId())
            .ifPresent(progress -> {
                progress.setCompleted(true);
                progress.setProgressPercentage(100);
                progressRepository.save(progress);
            });
    }
}
