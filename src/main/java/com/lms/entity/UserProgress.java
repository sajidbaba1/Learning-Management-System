package com.lms.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class UserProgress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    private User user;
    
    @ManyToOne
    private Content content;
    
    private boolean completed;
    
    private Integer progressPercentage; // 0-100
    
    private String lastAccessed; // timestamp
}
