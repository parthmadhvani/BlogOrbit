package com.example.cloud.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;
//import javax.persistence.*;
import java.util.List;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "authors")
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String email;

    @Column(nullable = false)
    private String password;

    private String profilePictureUrl;

    @Column(length = 500)
    private String bio;

    @OneToMany(mappedBy = "author")
    @JsonIgnore
    private List<BlogPost> posts;

    @OneToMany(mappedBy = "author")
    @JsonIgnore
    private List<Comment> comments;
}
