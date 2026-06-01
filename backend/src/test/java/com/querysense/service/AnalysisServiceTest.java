package com.querysense.service;

import com.querysense.model.AnalysisReport;
import com.querysense.model.AnalysisRequest;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
class AnalysisServiceTest {

    @Autowired
    private AnalysisService analysisService;

    @Test
    void shouldAnalyzeQuery() {

        AnalysisRequest request =
                new AnalysisRequest();

        request.setQuery(
                "SELECT * FROM employees"
        );

        AnalysisReport report =
                analysisService.analyze(request);

        assertNotNull(report);
        assertNotNull(report.getIssues());
        assertNotNull(report.getOptimizedQuery());

        System.out.println(report);
    }
}
