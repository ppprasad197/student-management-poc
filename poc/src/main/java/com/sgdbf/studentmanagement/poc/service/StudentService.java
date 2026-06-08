package com.sgdbf.studentmanagement.poc.service;

import org.springframework.stereotype.Service;

@Service
public class StudentService {
    /*private final StudentRepository studentRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder encoder;
    private final UserService userService;

    public StudentService(StudentRepository studentRepository, UserRepository userRepository, PasswordEncoder encoder, UserService userService) {
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
        this.encoder = encoder;
        this.userService = userService;
    }

    public List<Student> getAll() {
        return studentRepository.findAll();
    }

    @Transactional
    public Student save(Student student) {

        String studentId = student.getStudentId();

        if (studentId == null || studentId.isEmpty()) {
            throw new RuntimeException("Student ID cannot be null or empty");
        }

        String regex = "^SG\\d{4}[A-Z]{3}[A-Z]{2}\\d{3}$";

        if (!studentId.matches(regex)) {
            throw new RuntimeException(
                    "Invalid Student ID so you can not enrolled as library user"
            );
        }

        // ---------- VALIDATIONS ----------

        if (studentRepository.existsByEmail(student.getEmail())
                || userRepository.existsByEmail(student.getEmail())) {

            throw new RuntimeException("Email already exists");
        }

        if (studentRepository.existsByUsername(student.getUsername())
                || userRepository.existsByUserName(student.getUsername())) {

            throw new RuntimeException("Username already exists");
        }

        if (studentRepository.existsByStudentId(student.getStudentId())) {

            throw new RuntimeException("Student ID already exists");
        }

        // ---------- SAVE STUDENT ----------

        student.setPassword(
                encoder.encode(student.getPassword())
        );

        student.setUserStatus(UserStatus.PENDING);

        Student savedStudent = studentRepository.save(student);

        // ---------- CREATE USER ----------

        User user = new User();

        user.setFirstName(student.getFirstName());
        user.setLastName(student.getLastName());

        user.setUserName(student.getUsername());

        user.setEmail(student.getEmail());

        user.setPassword(student.getPassword());

        user.setRole(Role.STUDENT);

        user.setStudent(savedStudent);

        userService.save(user);

        return savedStudent;
    }

    public void delete(Long id) {
        studentRepository.deleteById(id);
    }

    public Student findStudentById(Long id) {
        return studentRepository.findById(id).orElse(null);
    }

    public Student updateStudent(Long id, Student updatedStudent, Authentication authentication) {

        Student existing = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // ✅ Update only if value is present
        if (updatedStudent.getFirstName() != null) {
            existing.setFirstName(updatedStudent.getFirstName());
        }

        if (updatedStudent.getLastName() != null) {
            existing.setLastName(updatedStudent.getLastName());
        }

        if (updatedStudent.getEmail() != null) {
            existing.setEmail(updatedStudent.getEmail());
        }

        if (updatedStudent.getUsername() != null) {
            existing.setUsername(updatedStudent.getUsername());
        }

        // ✅ Password update (only if provided)
        if (updatedStudent.getPassword() != null && !updatedStudent.getPassword().isEmpty()) {
            existing.setPassword(encoder.encode(updatedStudent.getPassword()));
        }

        return studentRepository.save(existing);
    }*/
}
