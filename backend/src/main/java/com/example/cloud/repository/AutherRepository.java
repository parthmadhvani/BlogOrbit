package com.example.cloud.repository;

import com.example.cloud.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AutherRepository extends JpaRepository<Author,Long> {
    Optional<Author> findByEmail(String email);
}
