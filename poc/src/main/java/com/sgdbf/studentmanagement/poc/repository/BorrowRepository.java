package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.entity.Book;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface BorrowRepository extends JpaRepository<BorrowRecord, Long> {

    List<BorrowRecord> findByUserAndReturnDateIsNull(User user);

    BorrowRecord findByUserAndBookAndReturnDateIsNull(User user, Book byId);

    int countByUserAndReturnDateIsNull(User user);

    boolean existsByBookAndUserAndReturnDateIsNull(Book book, User user);

    List<BorrowRecord> findAllByUserRoleAndReturnDate(Role role, LocalDate returnDate);

    List<BorrowRecord> findAllByReturnDateIsNull();

    BorrowRecord findByBookId(Long id);

    Boolean existsByBookIdAndReturnDateIsNull(Long id);
}
