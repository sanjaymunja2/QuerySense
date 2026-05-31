package com.querysense;

import com.querysense.service.QueryParserService;
import net.sf.jsqlparser.statement.Statement;

public class TestParser {

    public static void main(String[] args) {

        QueryParserService parser = new QueryParserService();

        String query = "SELECT * FROM users";

        Statement statement = parser.parseQuery(query);

        System.out.println(statement);
    }
}