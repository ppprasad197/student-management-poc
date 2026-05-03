package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;
import com.sgdbf.studentmanagement.poc.repository.StudentRepository;
import com.sgdbf.studentmanagement.poc.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {
    private final StudentService service;
    private final StudentRepository studentRepository;

    public StudentController(StudentService service, StudentRepository studentRepository) {
        this.service = service;
        this.studentRepository = studentRepository;
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @GetMapping
    public List<Student> getAllStudent() {
        return service.getAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN','STUDENT')")
    @PostMapping("/signup")
    public Student addStudent(@RequestBody Student student) {
        student.setUserStatus(UserStatus.PENDING);
        return service.save(student);
    }

    @PostMapping("/approveStudent/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<?> approveStudent(@PathVariable Long id) {
        Student student = service.findStudentById(id);
        if (student != null) {
            student.setUserStatus(UserStatus.APPROVED);
            studentRepository.save(student);
        } else {
            throw new RuntimeException("Student not found");
        }

        return ResponseEntity.ok("User approved");
    }

//    @PostMapping("/signUp")
//    public Student signUp(@RequestBody Student student) {
//        return addStudent(student);
//    }

    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','LIBRARIAN')")
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        service.delete(id);
    }
}
