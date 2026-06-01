package com.querysense.rules;

import com.querysense.model.Issue;
import com.querysense.model.Severity;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.PlainSelect;
import net.sf.jsqlparser.statement.select.Select;

import java.util.Optional;

public class Nplus1PatternRule implements AnalysisRule {

    @Override
    public Optional<Issue> analyze(Statement statement) {

        if (!(statement instanceof Select select)) {
            return Optional.empty();
        }

        PlainSelect plainSelect = select.getPlainSelect();

        if (plainSelect == null) {
            return Optional.empty();
        }

        if (plainSelect.getWhere() != null &&
                plainSelect.getWhere().toString().contains("SELECT")) {

            Issue issue = new Issue();

            issue.setRuleId(getRuleId());
            issue.setSeverity(Severity.CRITICAL);
            issue.setTitle("Potential N+1 Query Pattern");
            issue.setDescription("Subquery detected in WHERE clause.");
            issue.setSuggestion("Consider replacing with JOIN.");
            issue.setAffectedClause("WHERE");

            return Optional.of(issue);
        }

        return Optional.empty();
    }

    @Override
    public String getRuleId() {
        return "N_PLUS_1";
    }
}
