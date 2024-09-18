package com.example.cloud.service;

import com.example.cloud.dto.LoginDTO;
import com.example.cloud.model.Author;
import com.example.cloud.repository.AutherRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AuthorsService {

    private final AutherRepository autherRepository;

    public Author createUser(Author author) {
        return autherRepository.save(author);
    }

    public Author updateUser(Long id, Author userDetails) {
        Author user = autherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
        user.setName(userDetails.getName());
        user.setPassword(userDetails.getPassword());
        user.setEmail(userDetails.getEmail());
        user.setProfilePictureUrl(userDetails.getProfilePictureUrl());
        user.setBio(userDetails.getBio());
        return autherRepository.save(user);
    }

    public void deleteUser(Long id) {
        if (!autherRepository.existsById(id)) {
            throw new RuntimeException("User not found with id: " + id);
        }
        autherRepository.deleteById(id);
    }

    public List<Author> getAllUsers() {
        return autherRepository.findAll();
    }

    public Author getUserById(Long id) {
        return autherRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public Author authenticate(LoginDTO loginDTO) {
        Author author = autherRepository.findByEmail(loginDTO.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!author.getPassword().equals(loginDTO.getPassword()))
        {
            throw new IllegalArgumentException("Invalid password");
        }
        return author;
    }
}
