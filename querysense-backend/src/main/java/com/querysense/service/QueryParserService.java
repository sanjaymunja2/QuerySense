package com.querysense.service;

import net.sf.jsqlparser.parser.CCJSqlParserUtil;
import net.sf.jsqlparser.statement.Statement;
import org.springframework.stereotype.Service;

@Service
public class QueryParserService {

    public Statement parseQuery(String query) {
        try {
            return CCJSqlParserUtil.parse(query);
        } catch (Exception e) {
            throw new RuntimeException("Invalid SQL Query: " + e.getMessage());
        }
    }
}