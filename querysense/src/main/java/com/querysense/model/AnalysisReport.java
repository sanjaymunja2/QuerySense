package com.querysense.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Builder
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AnalysisReport {

    private Integer score;
    private String originalQuery;
    private String optimizedQuery;
    private String rewriteExplanation;
    private List<Issue> issues;
    private LocalDateTime analysisTimestamp;
}
