package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FineRepository extends JpaRepository<Fine, Long> {

    Optional<Fine> findByBorrowRecord(BorrowRecord borrowRecord);

    boolean existsByBorrowRecord(BorrowRecord record);

    boolean existsByUserAndBorrowRecord(User user, BorrowRecord record);

    List<Fine> findByUser(User user);
}
