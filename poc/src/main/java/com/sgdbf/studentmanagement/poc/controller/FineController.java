package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.repository.FineRepository;
import com.sgdbf.studentmanagement.poc.service.FIneService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/fine")
public class FineController {
    private final FIneService fineService;

    public FineController(FIneService fineService) {
        this.fineService = fineService;
    }

    @PostMapping("/pay-fine")
    public ResponseEntity<String> payFine(@RequestBody double amount,
                                          Authentication authentication) {

        fineService.payFine(amount, authentication);

        return ResponseEntity.ok("Fine payment successful");
    }


    @GetMapping("/my")
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

