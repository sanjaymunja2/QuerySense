package com.querysense.rules;

import com.querysense.model.Issue;
import com.querysense.model.Severity;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.AllColumns;
import net.sf.jsqlparser.statement.select.PlainSelect;
import net.sf.jsqlparser.statement.select.Select;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class SelectStarRule implements AnalysisRule {

    @Override
    public Optional<Issue> analyze(Statement statement) {

        if (!(statement instanceof Select select)) {
            return Optional.empty();
        }

        PlainSelect plainSelect = select.getPlainSelect();

        if (plainSelect == null) {
            return Optional.empty();
        }

        boolean hasStar = plainSelect.getSelectItems()
                .stream()
                .anyMatch(item -> "*".equals(item.toString()));
        if (hasStar) {

            Issue issue = new Issue();

            issue.setRuleId(getRuleId());
            issue.setSeverity(Severity.CRITICAL);
            issue.setTitle("SELECT * Detected");
            issue.setDescription("Selecting all columns transfers unnecessary data.");
            issue.setSuggestion("Specify only required columns.");
            issue.setAffectedClause("SELECT");

            return Optional.of(issue);
        }

        return Optional.empty();
    }

    @Override
    public String getRuleId() {
        return "SELECT_STAR";
    }
}
