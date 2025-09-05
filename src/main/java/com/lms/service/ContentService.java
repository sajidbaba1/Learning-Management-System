package com.lms.service;

import com.lms.entity.Content;
import com.lms.repository.ContentRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
public class ContentService {

    @Value("${file.upload-dir}")
    private String uploadDir;

    private final ContentRepository contentRepository;

    public ContentService(ContentRepository contentRepository) {
        this.contentRepository = contentRepository;
    }

    public Content saveContent(Long courseId, String title, String description, MultipartFile file) throws IOException {
        // Generate unique filename
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
        Path uploadPath = Paths.get(uploadDir);
        
        // Create upload directory if it doesn't exist
        if (!Files.exists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }
        
        // Save file
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath);
        
        // Save content metadata
        Content content = new Content();
        content.setTitle(title);
        content.setDescription(description);
        content.setResourceUrl(filePath.toString());
        // Set course, module, etc.
        
        return contentRepository.save(content);
    }

    public Optional<Content> getContent(Long contentId) {
        return contentRepository.findById(contentId);
    }
}

