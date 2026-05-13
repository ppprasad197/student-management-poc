package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.entity.Book;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface BorrowRepository extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByUserAndReturnDateIsNull(User user);

    BorrowRecord findByUserAndBookAndReturnDateIsNull(User user, Book byId);

    int countByUserAndReturnDateIsNull(User user);

    boolean existsByBookAndUserAndReturnDateIsNull(Book book, User user);
}
