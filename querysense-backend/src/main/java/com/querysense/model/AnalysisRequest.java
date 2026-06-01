package com.querysense.model;

import jakarta.validation.constraints.NotBlank;

public class AnalysisRequest {

    @NotBlank(message = "Query cannot be empty")
    private String query;

    public AnalysisRequest() {
    }

    public AnalysisRequest(String query) {
        this.query = query;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }
}
