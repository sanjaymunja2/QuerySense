package com.querysense.model;

import java.util.List;

public class TableSchema {

    private String tableName;
    private List<String> columns;
    private List<String> indexes;
    private Long estimatedRows;

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public List<String> getColumns() {
        return columns;
    }

    public void setColumns(List<String> columns) {
        this.columns = columns;
    }

    public List<String> getIndexes() {
        return indexes;
    }

    public void setIndexes(List<String> indexes) {
        this.indexes = indexes;
    }

    public Long getEstimatedRows() {
        return estimatedRows;
    }

    public void setEstimatedRows(Long estimatedRows) {
        this.estimatedRows = estimatedRows;
    }
}