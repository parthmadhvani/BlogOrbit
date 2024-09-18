package com.example.cloud.controller;

import com.example.cloud.dto.BlogPostDTO;
import com.example.cloud.model.Author;
import com.example.cloud.model.BlogPost;
//import com.example.cloud.service.BlogPostService;
import com.example.cloud.repository.AutherRepository;
import com.example.cloud.repository.BlogRepository;
import com.example.cloud.service.BlogService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/blog-posts")
@RequiredArgsConstructor
@CrossOrigin
public class BlogController {

    private final BlogService blogPostService;
    private final BlogRepository blogRepository;
    private final AutherRepository autherRepository;

    // Create a new blog post
    @PostMapping
    public ResponseEntity<BlogPost> createPost(@RequestBody BlogPostDTO blogPost) {
        try {
            // Fetch the Author from the database
            Author author = autherRepository.findById(blogPost.getAuthorId())
                    .orElseThrow(() -> new RuntimeException("Author not found with id: " + blogPost.getAuthorId()));

            // Create a new BlogPost
            BlogPost blogPostToSave = BlogPost.builder()
                    .title(blogPost.getTitle())
                    .content(blogPost.getContent())
                    .author(author) // Set the Author
                    .likes(0)
                    .views(0)
                    .createdAt(LocalDateTime.now())
                    .build();

            // Save the BlogPost
            BlogPost savedBlogPost = blogRepository.save(blogPostToSave);

            return ResponseEntity.status(HttpStatus.CREATED).body(savedBlogPost);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

        // Edit an existing blog post
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updatePost(
            @PathVariable Long id,
            @RequestBody BlogPost blogPostDetails) {
        BlogPost updatedPost = blogPostService.updatePost(id, blogPostDetails);
        return ResponseEntity.ok(updatedPost);
    }

    // Delete a blog post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        blogPostService.deletePost(id);
        return ResponseEntity.noContent().build();
    }

    // Get all blog posts (optional, for listing posts)
    @GetMapping
    public ResponseEntity<List<BlogPost>> getAllPosts() {
        List<BlogPost> posts = blogPostService.getAllPosts();
        return ResponseEntity.ok(posts);
    }

    // Get a single blog post by ID (optional)
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getPostById(@PathVariable Long id) {
        BlogPost post = blogPostService.getPostById(id);
        return ResponseEntity.ok(post);
    }

}
