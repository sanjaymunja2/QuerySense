package com.querysense.service;

import com.querysense.model.AnalysisReport;
import com.querysense.model.AnalysisRequest;
import com.querysense.model.Issue;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnalysisService {

    private final QueryParserService queryParserService;
    private final RuleEngine ruleEngine;
    private final RewriterService rewriterService;

    public AnalysisService(
            QueryParserService queryParserService,
            RuleEngine ruleEngine,
            RewriterService rewriterService
    ) {
        this.queryParserService = queryParserService;
        this.ruleEngine = ruleEngine;
        this.rewriterService = rewriterService;
    }

    public AnalysisReport analyze(AnalysisRequest request) {

        var statement =
                queryParserService.parseQuery(request.getQuery());

        List<Issue> issues =
                ruleEngine.analyze(statement);

        int score =
                ruleEngine.calculateScore(issues);

        String optimizedQuery =
                rewriterService.rewrite(
                        request.getQuery(),
                        issues
                );

        return AnalysisReport.builder()
                .score(score)
                .originalQuery(request.getQuery())
                .optimizedQuery(optimizedQuery)
                .rewriteExplanation(
                        rewriterService.buildExplanation(issues)
                )
                .issues(issues)
                .analysisTimestamp(LocalDateTime.now())
                .build();
    }
}
