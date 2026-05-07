package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.dto.FineDTO;
import com.sgdbf.studentmanagement.poc.dto.FinePaymentRequestDTO;
import com.sgdbf.studentmanagement.poc.dto.FinePaymentResponseDTO;
import com.sgdbf.studentmanagement.poc.service.FineService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/fine")
public class FineController {
    private final FineService fineService;

    public FineController(FineService fineService) {
        this.fineService = fineService;
    }

    @PreAuthorize("hasRole('STUDENT')")
    @PostMapping("/pay")
    public ResponseEntity<FinePaymentResponseDTO> payFine(
            @RequestBody FinePaymentRequestDTO request,
            Authentication authentication) {

        return ResponseEntity.ok(
                fineService.payFine(request.getAmount(), authentication.getName())
        );
    }

    @PreAuthorize("hasRole('STUDENT')")
    @GetMapping("/myFine")
    public ResponseEntity<FineDTO> getMyFines(Authentication authentication) {
        return ResponseEntity.ok(
                fineService.getMyFines(authentication.getName())
        );
    }

//    @GetMapping("/summary")
//    public Map<String, Double> getSummary(Authentication authentication) {
//        return fineService.getFineSummary(authentication.getName());
//    }

//    @PostMapping("/refund/{id}")
//    public ResponseEntity<String> refund(@PathVariable Long id,
//                                         @RequestParam double amount) {
//        fineService.refundFine(id, amount);
//        return ResponseEntity.ok("Refund successful");
//    }
}

