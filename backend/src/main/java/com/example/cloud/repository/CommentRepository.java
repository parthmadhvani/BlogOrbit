package com.example.cloud.repository;

import com.example.cloud.model.BlogPost;
import com.example.cloud.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByBlogPost(BlogPost blogPost);

    List<Comment> findByBlogPostId(Long id);
}
