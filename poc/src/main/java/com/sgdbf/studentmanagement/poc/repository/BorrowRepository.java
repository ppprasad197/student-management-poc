package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.entity.Book;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface BorrowRepository extends JpaRepository<BorrowRecord, Long> {
    int countByStudentAndReturnDateIsNull(Student student);

    Optional<BorrowRecord> findByStudentAndBookAndReturnDateIsNull(Student student, Book byId);
}
