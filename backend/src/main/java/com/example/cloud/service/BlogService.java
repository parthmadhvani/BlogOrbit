package com.example.cloud.service;

import com.example.cloud.dto.BlogPostDTO;
import com.example.cloud.model.BlogPost;
//import com.example.cloud.repository.BlogPostRepository;
import com.example.cloud.repository.BlogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BlogService {

    private final BlogRepository blogPostRepository;

    public BlogPost createPost(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }

    public BlogPost updatePost(Long id, BlogPost blogPostDetails) {
        Optional<BlogPost> optionalPost = blogPostRepository.findById(id);
        if (optionalPost.isPresent()) {
            BlogPost existingPost = optionalPost.get();
            existingPost.setTitle(blogPostDetails.getTitle());
            existingPost.setContent(blogPostDetails.getContent());
            existingPost.setLikes(blogPostDetails.getLikes());
            existingPost.setViews(blogPostDetails.getViews());
            return blogPostRepository.save(existingPost);
        } else {
            // Handle post not found case, throw an exception or return null
            return null;
        }
    }

    public void deletePost(Long id) {
        blogPostRepository.deleteById(id);
    }

    public List<BlogPost> getAllPosts() {
         return blogPostRepository.findAll();
    }


    public BlogPost getPostById(Long id) {
        return blogPostRepository.findById(id).orElse(null);
    }
}
