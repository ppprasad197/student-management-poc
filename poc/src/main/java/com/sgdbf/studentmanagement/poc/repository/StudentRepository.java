package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, Long> {
}
