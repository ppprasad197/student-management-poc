package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.dto.*;
import com.sgdbf.studentmanagement.poc.service.FineService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/fine")
public class FineController {
    private final FineService fineService;

    public FineController(FineService fineService) {
        this.fineService = fineService;
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/pay")
    public ResponseEntity<FinePaymentResponseDTO> payFine(@RequestBody FinePaymentRequestDTO request,
                                                          Authentication authentication) {
        return ResponseEntity.ok(
                fineService.payFine(
                        request.getAmount(),
                        authentication.getName()
                )
        );
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/myFine")
    public ResponseEntity<FineDTO> getMyFines(
            Authentication authentication) {
        return ResponseEntity.ok(
                fineService.getMyFines(
                        authentication.getName()
                )
        );
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/summary")
    public ResponseEntity<FineSummaryDto> getSummary(Authentication authentication) {
        return ResponseEntity.ok(
                fineService.getFineSummary(
                        authentication.getName()
                )
        );
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @GetMapping("/all")
    public ResponseEntity<List<AdminLibrarianFineResponseDto>> getAllStudentFines() {
        return ResponseEntity.ok(
                fineService.getAllStudentFines()
        );
    }
}

