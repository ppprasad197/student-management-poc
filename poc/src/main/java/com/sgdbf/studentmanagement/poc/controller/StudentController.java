package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;
import com.sgdbf.studentmanagement.poc.repository.StudentRepository;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import com.sgdbf.studentmanagement.poc.service.StudentService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@CrossOrigin(origins = "http://localhost:4200")
public class StudentController {
    private final StudentService studentService;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public StudentController(StudentService studentService, StudentRepository studentRepository, UserRepository userRepository) {
        this.studentService = studentService;
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

        @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
        @GetMapping
        public List<Student> getAllStudent() {
            return studentService.getAll();
        }


    @PostMapping("/signup")
    public Student addStudent(@RequestBody Student student) {
        System.out.println(student.getStudentId());
        System.out.println(student.getFirstName());
        System.out.println(student.getLastName());
        System.out.println(student.getEmail());
        System.out.println(student.getPassword());
        System.out.println(student.getUsername());
        student.setUserStatus(UserStatus.PENDING);
        return studentService.save(student);
    }

    @PostMapping("/approveStudent/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<?> approveStudent(@PathVariable Long id) {
        Student student = studentService.findStudentById(id);
        if (student != null) {
            student.setUserStatus(UserStatus.APPROVED);
            studentRepository.save(student);
            student.getUser().setUserStatus(UserStatus.APPROVED);
            userRepository.save(student.getUser());
        } else {
            throw new RuntimeException("Student not found");
        }

        return ResponseEntity.ok("User approved");
    }


    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','LIBRARIAN')")
    @DeleteMapping("/{id}")
    public void deleteStudent(@PathVariable Long id) {
        studentService.delete(id);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<?> updateStudent(@PathVariable Long id,
                                           @RequestBody Student student,
                                           Authentication authentication) {

        studentService.updateStudent(id, student, authentication);
        return ResponseEntity.ok("Student updated");
    }
}
