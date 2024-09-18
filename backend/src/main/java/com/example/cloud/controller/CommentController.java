package com.example.cloud.controller;

import com.example.cloud.dto.CommentReq;
import com.example.cloud.model.BlogPost;
import com.example.cloud.model.Comment;
import com.example.cloud.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/comments")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping
    public Comment addComment(@RequestBody CommentReq commentReq) {
        return commentService.saveComment(commentReq);
    }

    @GetMapping("/{id}")
    public List<Comment> getCommentByPost(@PathVariable Long id) {
        return commentService.getCommentsByBlogPostId(id);
    }

    @GetMapping
    public ResponseEntity<List<Comment>> getAllComments() {
        List<Comment> comments = commentService.getAllComments();
        return ResponseEntity.ok(comments);
    }
}
