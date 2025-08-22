package com.example.book_management_system.model;

import java.time.LocalDate;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

// book model with proper field validation

@Document(collection= "books")
@Data // for avoiding boilerplate getters and setters
public class Book {

    @Id
    private String id;


    @NotBlank(message= "Title is required")
    @Size(max = 100, message = "Title must be less than 100 characters")
    private String title;


    @NotBlank(message= "Author is required")
    @Size(max = 50, message = "Author must be less than 50 characters")
    private String author;

    @NotNull(message = "Publication date is required")
    private LocalDate publicationDate;

    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "\\d{13}", message = "ISBN must be a 13-digit number")
    private String isbn;


    @NotNull(message = "Genre is required")
    private Genre genre;


    @NotNull(message = "Rating is required")
    @Min(value = 1, message = "Rating must be at least 1")
    @Max(value = 5, message = "Rating cannot be more than 5")
    private Integer rating;


    public enum Genre {
        FICTION, NON_FICTION, MYSTERY, FANTASY, ROMANCE, SCI_FI, OTHERS
    }
}
