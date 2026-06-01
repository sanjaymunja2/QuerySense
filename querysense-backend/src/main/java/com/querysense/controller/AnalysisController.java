package com.querysense.controller;

import com.querysense.model.AnalysisReport;
import com.querysense.model.AnalysisRequest;
import com.querysense.service.AnalysisService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AnalysisController {

    private final AnalysisService analysisService;

    public AnalysisController(AnalysisService analysisService) {
        this.analysisService = analysisService;
    }

    @PostMapping("/analyze")
    public AnalysisReport analyze(
            @Valid @RequestBody AnalysisRequest request) {

        return analysisService.analyze(request);
    }

    @GetMapping("/health")
    public String health() {

        return "QuerySense Running";
    }

    @GetMapping("/rules")
    public String rules() {

        return "8 Active Rules";
    }
}
