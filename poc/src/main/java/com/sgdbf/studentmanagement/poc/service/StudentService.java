package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.repository.StudentRepository;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;

    public StudentService(StudentRepository studentRepository, UserRepository userRepository, PasswordEncoder encoder) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }


    public Student save(Student student) {

        String studentId = student.getStudentId();

        if (studentId == null || studentId.isEmpty()) {
            throw new RuntimeException("Student ID cannot be null or empty");
        }

        String regex = "^SG\\d{4}[A-Z]{3}[A-Z]{2}\\d{3}$";

        if (!studentId.matches(regex)) {
            throw new RuntimeException("Invalid Student ID so you can not enrolled as library user");
        }

        // ✅ Save student first
        Student savedStudent = studentRepository.save(student);

        // ✅ Create User automatically
        User user = new User();
        user.setFirstName(student.getFirstName());
        user.setLastName(student.getLastName());
        user.setUserName(student.getUsername());
        user.setPassword(encoder.encode(student.getPassword()));
        user.setRole(Role.STUDENT);
        user.setStudent(savedStudent);

        userRepository.save(user);

        return savedStudent;
    }

    public void delete(Long id) {
        studentRepository.deleteById(id);
    }

}
