package com.querysense.rules;

import com.querysense.model.Issue;
import com.querysense.model.Severity;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.delete.Delete;
import net.sf.jsqlparser.statement.update.Update;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class MissingWhereRule implements AnalysisRule {

    @Override
    public Optional<Issue> analyze(Statement statement) {

        if (statement instanceof Delete deleteStmt) {

            if (deleteStmt.getWhere() == null) {
                return Optional.of(createIssue());
            }
        }

        if (statement instanceof Update updateStmt) {

            if (updateStmt.getWhere() == null) {
                return Optional.of(createIssue());
            }
        }

        return Optional.empty();
    }

    private Issue createIssue() {

        Issue issue = new Issue();

        issue.setRuleId(getRuleId());
        issue.setSeverity(Severity.CRITICAL);
        issue.setTitle("Missing WHERE Clause");
        issue.setDescription("UPDATE or DELETE without WHERE affects all rows.");
        issue.setSuggestion("Add a WHERE clause to restrict affected records.");
        issue.setAffectedClause("WHERE");

        return issue;
    }

    @Override
    public String getRuleId() {
        return "MISSING_WHERE";
    }
}