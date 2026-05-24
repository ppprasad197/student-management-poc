package com.sgdbf.studentmanagement.poc.setup;

import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminAccountSetup implements ApplicationRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AdminAccountSetup(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

//    @Override
//    public void run(String... args) throws Exception {
//        if (userRepository.findByUserName("admin").isEmpty()) {
//            User admin = new User(1L, "admin", "admin", "admin", passwordEncoder.encode("admin123"), Role.ADMIN, UserStatus.APPROVED, null);
//            userRepository.save(admin);
//        }
//    }

    @Override
    public void run(ApplicationArguments args) throws Exception {
        if (userRepository.findByUserName("admin").isEmpty()) {
            User admin = new User(1L, "admin", "admin", "admin@gmail.com", "admin", passwordEncoder.encode("admin123"), Role.ADMIN, UserStatus.APPROVED);
            admin.setUserStatus(UserStatus.APPROVED);
            userRepository.save(admin);
        }
    }
}
