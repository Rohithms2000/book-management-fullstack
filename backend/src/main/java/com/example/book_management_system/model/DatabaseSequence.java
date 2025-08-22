package com.example.book_management_system.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

// document to hold the sequence of books
@Document(collection = "database_sequences")
@Data
public class DatabaseSequence {

    @Id
    private String id;

    private long seq;
}

