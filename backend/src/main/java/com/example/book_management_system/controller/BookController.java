package com.example.book_management_system.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import com.example.book_management_system.model.Book;
import com.example.book_management_system.repository.BookRepository;
import com.example.book_management_system.service.BookService;

import jakarta.validation.Valid;



@RestController
@RequestMapping("/api")
public class BookController {

    @Autowired
    private BookService bookService;

    @Autowired
    private BookRepository bookRepository;


    // add a book to the database
    @PostMapping("/books")
    public ResponseEntity<Book> addBook(@Valid @RequestBody Book book) {
        Book savedBook = bookService.saveBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }


    // to get all books
   @GetMapping("/books")
    public ResponseEntity<List<Book>> listBooks() {
        List<Book> books = bookRepository.findAll();
        return books.isEmpty()
                ? ResponseEntity.noContent().build()
                : ResponseEntity.ok(books);
    }


    // to get the details of a book by id
    @GetMapping("/books/{id}")
    public ResponseEntity<Book> getBook(@PathVariable String id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    // to delete a book from the database
    @DeleteMapping("/books/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    // external api for more details(google books api)
    private final String GOOGLE_BOOKS_API = "https://www.googleapis.com/books/v1/volumes?q=";

    // proxy the external api
    @GetMapping("/books/{id}/more-details")
    public ResponseEntity<?> getMoreBookDetails(@PathVariable String id) {
        Optional<Book> bookOpt = bookRepository.findById(id);

        if (bookOpt.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        Book book = bookOpt.get();
        // search for book by both title and author name
        String query = "intitle:" + book.getTitle() + "+inauthor:" + book.getAuthor();

        RestTemplate restTemplate = new RestTemplate();
        String url = GOOGLE_BOOKS_API + query;

        Object response = restTemplate.getForObject(url, Object.class);

        return ResponseEntity.ok(response);
    }

    
}
