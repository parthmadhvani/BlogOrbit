package com.example.cloud.controller;

import com.example.cloud.dto.AuthorDTO;
import com.example.cloud.dto.AuthorReq;
import com.example.cloud.dto.LoginDTO;
import com.example.cloud.model.Author;
import com.example.cloud.service.AuthorsService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
@CrossOrigin
public class AuthenticationController {

    private final AuthorsService authorsService;

    // Create a new Author
    @PostMapping("/signup")
    public ResponseEntity<Author> createAuthor(@RequestBody AuthorReq authorReq) {
        Author author = Author.builder()
                .name(authorReq.getName())
                .password(authorReq.getPassword())
                .email(authorReq.getEmail())
                .profilePictureUrl(authorReq.getProfilePictureUrl())
                .bio(authorReq.getBio())
                .build();

        Author createdAuthor = authorsService.createUser(author);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdAuthor);
    }

    // Update an existing Author
    @PostMapping("/login")
    public ResponseEntity<Author> loginUser(@RequestBody LoginDTO loginDTO) {
        Author author = authorsService.authenticate(loginDTO);
        return ResponseEntity.ok(author);
    }

    // Delete a Author
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAuthor(@PathVariable Long id) {
        authorsService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }

    // Get a single Author by ID
    @GetMapping("/{id}")
    public ResponseEntity<Author> getAuthorById(@PathVariable Long id) {
        Author Author = authorsService.getUserById(id);
        return ResponseEntity.ok(Author);
    }
}
