package com.example.cloud.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BlogPostDTO {
    private Long id;
    private String title;
    private String content;
    private Long authorId;  // ID of the author
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private int likes;
    private int views;
}
