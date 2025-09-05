package com.lms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Content {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private String contentType; // VIDEO, DOCUMENT, QUIZ, etc.
    private String resourceUrl;
    
    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;
    
    @ManyToOne
    @JoinColumn(name = "module_id")
    private Module module;
}
