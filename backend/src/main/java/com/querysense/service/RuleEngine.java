package com.querysense.service;

import com.querysense.model.Issue;
import com.querysense.model.Severity;
import com.querysense.rules.AnalysisRule;
import net.sf.jsqlparser.statement.Statement;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RuleEngine {

    private final List<AnalysisRule> rules;

    public RuleEngine(List<AnalysisRule> rules) {
        this.rules = rules;
    }

    public List<Issue> analyze(Statement statement) {

        List<Issue> issues = new ArrayList<>();

        for (AnalysisRule rule : rules) {

            rule.analyze(statement)
                    .ifPresent(issues::add);
        }

        return issues;
    }

    public int calculateScore(List<Issue> issues) {

        int score = 100;

        for (Issue issue : issues) {

            if (issue.getSeverity() == Severity.CRITICAL) {
                score -= 25;
            } else if (issue.getSeverity() == Severity.WARNING) {
                score -= 10;
            } else if (issue.getSeverity() == Severity.INFO) {
                score -= 3;
            }
        }

        return Math.max(score, 0);
    }
}