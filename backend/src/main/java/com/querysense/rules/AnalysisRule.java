package com.querysense.rules;

import com.querysense.model.Issue;
import net.sf.jsqlparser.statement.Statement;

import java.util.Optional;

public interface AnalysisRule {

    Optional<Issue> analyze(Statement statement);

    String getRuleId();
}