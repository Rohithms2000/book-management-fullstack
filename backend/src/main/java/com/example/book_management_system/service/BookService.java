package com.example.book_management_system.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.book_management_system.model.Book;
import com.example.book_management_system.repository.BookRepository;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private SequenceGeneratorService sequenceGeneratorService;

    public Book saveBook(Book book) {
        long seq = sequenceGeneratorService.generateSequence("books_sequence");
        book.setId(String.format("B-%03d", seq)); // to generate IDs like 'B-001,B-002,....'
        return bookRepository.save(book);
    }
}
