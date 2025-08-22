package com.example.book_management_system.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.book_management_system.model.Book;

public interface BookRepository extends MongoRepository<Book, String> {

}
