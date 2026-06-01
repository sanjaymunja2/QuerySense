package com.querysense.service;

import com.querysense.model.Issue;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RewriterService {
    public String buildExplanation(List<Issue> issues) {

        StringBuilder explanation = new StringBuilder();

        for (Issue issue : issues) {

            switch (issue.getRuleId()) {

                case "SELECT_STAR":
                    explanation.append(
                            "Replaced SELECT * with specific columns. "
                    );
                    break;

                case "MISSING_INDEX":
                    explanation.append(
                            "Suggested creating an index. "
                    );
                    break;

                case "NO_LIMIT":
                    explanation.append(
                            "Suggested adding LIMIT clause. "
                    );
                    break;
            }
        }

        return explanation.toString();
    }

    public String rewrite(String originalQuery, List<Issue> issues) {

        String optimizedQuery = originalQuery;

        for (Issue issue : issues) {

            if ("SELECT_STAR".equals(issue.getRuleId())) {

                optimizedQuery =
                        optimizedQuery.replace(
                                "SELECT *",
                                "SELECT id, name"
                        );
            }
        }

        return optimizedQuery;
    }
}
