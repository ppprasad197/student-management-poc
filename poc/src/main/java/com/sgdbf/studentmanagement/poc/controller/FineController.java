package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.service.FineService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fine")
public class FineController {
    private final FineService fineService;

    public FineController(FineService fineService) {
        this.fineService = fineService;
    }

    @PreAuthorize("hasAnyRole('STUDENT')")
    @PostMapping("/pay")
    public ResponseEntity<String> payFine(@RequestBody Fine fine,
                                          Authentication authentication) {

        fineService.payFine(fine.getAmount(), authentication);

        return ResponseEntity.ok("Fine payment successful");
    }


    @PreAuthorize("hasAnyRole('STUDENT')")
    @GetMapping("/myFine")
    public List<Fine> getMyFines(Authentication authentication) {
        return fineService.getMyFines(authentication);
    }

    @GetMapping("/summary")
    public Map<String, Double> getSummary(Authentication authentication) {
        return fineService.getFineSummary(authentication);
    }

//    @PostMapping("/refund/{id}")
//    public ResponseEntity<String> refund(@PathVariable Long id,
//                                         @RequestParam double amount) {
//        fineService.refundFine(id, amount);
//        return ResponseEntity.ok("Refund successful");
//    }
}

