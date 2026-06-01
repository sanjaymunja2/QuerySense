package com.querysense.rules;

import com.querysense.model.Issue;
import com.querysense.model.Severity;
import net.sf.jsqlparser.statement.Statement;
import net.sf.jsqlparser.statement.select.Join;
import net.sf.jsqlparser.statement.select.PlainSelect;
import net.sf.jsqlparser.statement.select.Select;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Optional;

@Component
public class CartesianJoinRule implements AnalysisRule {

    @Override
    public Optional<Issue> analyze(Statement statement) {

        if (!(statement instanceof Select select)) {
            return Optional.empty();
        }

        PlainSelect plainSelect = select.getPlainSelect();

        if (plainSelect == null) {
            return Optional.empty();
        }

        List<Join> joins = plainSelect.getJoins();

        if (joins == null) {
            return Optional.empty();
        }

        for (Join join : joins) {

            if (join.getOnExpressions() == null ||
                    join.getOnExpressions().isEmpty()) {

                Issue issue = new Issue();

                issue.setRuleId(getRuleId());
                issue.setSeverity(Severity.CRITICAL);
                issue.setTitle("Cartesian Join Detected");
                issue.setDescription("JOIN without ON condition causes Cartesian product.");
                issue.setSuggestion("Add a proper JOIN condition.");
                issue.setAffectedClause("JOIN");

                return Optional.of(issue);
            }
        }

        return Optional.empty();
    }

    @Override
    public String getRuleId() {
        return "CARTESIAN_JOIN";
    }
}
