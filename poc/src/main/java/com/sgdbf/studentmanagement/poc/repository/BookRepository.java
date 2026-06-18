package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
    Page<Book> findAllByIsDeletedFalse(Pageable pageable);
}
