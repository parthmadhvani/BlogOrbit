package com.example.cloud.service;

import com.example.cloud.dto.CommentReq;
import com.example.cloud.model.Author;
import com.example.cloud.model.BlogPost;
import com.example.cloud.model.Comment;
import com.example.cloud.repository.AutherRepository;
import com.example.cloud.repository.BlogRepository;
import com.example.cloud.repository.CommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CommentService {

    @Autowired
    private CommentRepository commentRepository;
    @Autowired
    private AutherRepository autherRepository;
    @Autowired
    private BlogRepository blogRepository;

    public Comment saveComment(CommentReq commentReq) {
        Author author = autherRepository.findById(commentReq.getAuthorId())
                        .orElseThrow(() -> new RuntimeException("User not found with id: " + commentReq.getAuthorId()));

        BlogPost blogPost = blogRepository.findById(commentReq.getBlogPostId())
                .orElseThrow(() -> new RuntimeException("BlogPost not found with id: " + commentReq.getBlogPostId()));

        Comment comment = new Comment();
        comment.setContent(commentReq.getContent());
        comment.setAuthor(author);
        comment.setBlogPost(blogPost);

        return commentRepository.save(comment);
    }

    public List<Comment> getCommentsByBlogPost(BlogPost blogPost) {
        return commentRepository.findByBlogPost(blogPost);
    }

    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public List<Comment> getCommentsByBlogPostId(Long id) {
        return commentRepository.findByBlogPostId(id);
    }

}
