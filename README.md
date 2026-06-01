# QuerySense — Intelligent SQL Query Analyzer

Analyze SQL queries before they hit production.

QuerySense detects SQL anti-patterns, missing indexes, inefficient query structures, and provides optimized query suggestions with explanations.

---

## Live Demo

Frontend: https://your-vercel-url.vercel.app

Backend API: https://your-railway-url.up.railway.app

---

## Features

- Detects SELECT * anti-patterns
- Detects missing WHERE clauses
- Detects missing LIMIT clauses
- Detects missing indexes
- Detects Cartesian joins
- Detects N+1 query patterns
- Detects functions on indexed columns
- Detects correlated subqueries
- Query health score (0-100)
- Optimized query rewrite suggestions
- Severity-based issue reporting

---

## Tech Stack

### Backend
- Java 17
- Spring Boot 3
- Maven
- JSQLParser

### Frontend
- React 18
- Vite
- Axios

### Deployment
- Railway
- Vercel

---

## Architecture

React Frontend

↓

Spring Boot REST API

↓

JSQLParser

↓

Rule Engine

↓

Analysis Report

---

## API Endpoint

### POST /api/analyze

Request

```json
{
  "query": "SELECT * FROM orders WHERE customer_id = 5",
  "schema": []
}
```

Response

```json
{
  "score": 75,
  "issues": [],
  "optimizedQuery": "SELECT id, amount FROM orders WHERE customer_id = 5"
}
```

---

## Run Locally

### Backend

```bash
cd querysense-backend
mvn spring-boot:run
```

Runs on:

```
http://localhost:8080
```

### Frontend

```bash
cd querysense-frontend
npm install
npm run dev
```

Runs on:

```
http://localhost:5173
```

---

## Screenshots

### Query Input

(Add screenshot here)

### Analysis Result

(Add screenshot here)

### Query Comparison

(Add screenshot here)

---

## Future Improvements

- MySQL EXPLAIN plan integration
- VS Code extension
- GitHub Action integration
- Batch query analysis

---

## Author

Sanju

BCA, VIT-AP University

2026
