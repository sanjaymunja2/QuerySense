package com.querysense.model;

public class Issue {

    private String ruleId;
    private Severity severity;
    private String title;
    private String description;
    private String suggestion;
    private String affectedClause;

    public String getRuleId() {
        return ruleId;
    }

    public void setRuleId(String ruleId) {
        this.ruleId = ruleId;
    }

    public Severity getSeverity() {
        return severity;
    }

    public void setSeverity(Severity severity) {
        this.severity = severity;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getSuggestion() {
        return suggestion;
    }

    public void setSuggestion(String suggestion) {
        this.suggestion = suggestion;
    }

    public String getAffectedClause() {
        return affectedClause;
    }

    public void setAffectedClause(String affectedClause) {
        this.affectedClause = affectedClause;
    }
}