package com.querysense.rules;

import com.querysense.model.Issue;
import com.querysense.model.Severity;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.PlainSelect;
import net.sf.jsqlparser.statement.select.Select;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class NoLimitRule implements AnalysisRule {

    @Override
    public Optional<Issue> analyze(Statement statement) {

        if (!(statement instanceof Select select)) {
            return Optional.empty();
        }

        PlainSelect plainSelect = select.getPlainSelect();

        if (plainSelect == null) {
            return Optional.empty();
        }

        if (plainSelect.getLimit() == null) {

            Issue issue = new Issue();

            issue.setRuleId(getRuleId());
            issue.setSeverity(Severity.WARNING);
            issue.setTitle("No LIMIT Clause");
            issue.setDescription("Query may return excessive rows.");
            issue.setSuggestion("Consider adding LIMIT for pagination.");
            issue.setAffectedClause("SELECT");

            return Optional.of(issue);
        }

        return Optional.empty();
    }

    @Override
    public String getRuleId() {
        return "NO_LIMIT";
    }
}
