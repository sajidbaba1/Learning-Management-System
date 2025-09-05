package com.lms.controller;

import com.lms.entity.Content;
import com.lms.service.ContentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/content")
public class ContentController {

    @Autowired
    private ContentService contentService;

    @PostMapping("/upload/{courseId}")
    public ResponseEntity<?> uploadContent(
            @PathVariable Long courseId,
            @RequestParam("file") MultipartFile file,
            @RequestParam String title,
            @RequestParam(required = false) String description) {
        try {
            Content content = contentService.saveContent(courseId, title, description, file);
            return ResponseEntity.ok(content);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Failed to upload content: " + e.getMessage());
        }
    }

    @GetMapping("/{contentId}")
    public ResponseEntity<?> getContent(@PathVariable Long contentId) {
        return contentService.getContent(contentId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
