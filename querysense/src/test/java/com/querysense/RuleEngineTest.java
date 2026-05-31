package com.querysense;

import com.querysense.model.Issue;
import com.querysense.service.QueryParserService;
import com.querysense.service.RuleEngine;
import net.sf.jsqlparser.statement.Statement;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
class RuleEngineTest {

    @Autowired
    private QueryParserService parserService;

    @Autowired
    private RuleEngine ruleEngine;

    @Test
    void testRuleEngine() throws Exception {

        String sql = "SELECT * FROM employees";

        Statement statement = parserService.parseQuery(sql);

        List<Issue> issues = ruleEngine.analyze(statement);

        System.out.println("Issues Found: " + issues.size());

        issues.forEach(issue ->
                System.out.println(issue.getTitle()));

        int score = ruleEngine.calculateScore(issues);

        System.out.println("Score: " + score);
    }
}