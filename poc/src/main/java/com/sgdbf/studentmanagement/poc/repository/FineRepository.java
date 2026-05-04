package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FineRepository extends JpaRepository<Fine, Long> {
    List<Fine> findByStudent(Student student);

    List<Fine> findByStudentAndPaidFalse(Student student);

    Optional<Fine> findByBorrowRecord(BorrowRecord borrowRecord);

    List<Fine> findByStudentAndPaid(Student student, boolean b);
}
