package com.querysense.service;

import com.querysense.model.Issue;
import com.querysense.model.Severity;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertFalse;

class RewriterServiceTest {

    @Test
    void shouldReplaceSelectStar() {

        RewriterService service = new RewriterService();

        Issue issue = new Issue();
        issue.setRuleId("SELECT_STAR");
        issue.setSeverity(Severity.CRITICAL);

        String result =
                service.rewrite(
                        "SELECT * FROM users",
                        List.of(issue)
                );

        assertFalse(result.contains("SELECT *"));
    }
}
