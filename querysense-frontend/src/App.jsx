import { useState } from "react";
import QueryInputPanel from "./components/QueryInputPanel";
import ResultPanel from "./components/ResultPanel";

const mockResponse = {
  score: 65,
  issues: [
    {
      severity: "CRITICAL",
      title: "SELECT * Detected",
      description: "Selecting all columns transfers unnecessary data.",
      suggestion: "Specify only required columns.",
      affectedClause: "SELECT"
    },
    {
      severity: "WARNING",
      title: "No LIMIT Clause",
      description: "Query may return excessive rows.",
      suggestion: "Consider adding LIMIT for pagination.",
      affectedClause: "SELECT"
    }
  ],
  originalQuery: "SELECT * FROM users",
  optimizedQuery: "SELECT id, name FROM users LIMIT 100",
  explanation:
    "Replaced SELECT * with specific columns. Added LIMIT clause to prevent full table scan and reduce data transfer."
};

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async (data) => {
    setError("");
    setResult(null);

    if (!data.query.trim()) {
      setError("Enter a SQL query before running analysis.");
      return;
    }

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setResult(mockResponse);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0F1117] text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-8 md:px-8 lg:py-10">
        <header className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-3 inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-300">
              Intelligent SQL Query Analyzer
            </div>
            <h1 className="text-4xl font-bold tracking-normal text-white md:text-5xl">
              QuerySense
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400 md:text-base">
              Detect risky SQL patterns, review optimizer suggestions, and compare rewrites in a focused developer workflow.
            </p>
          </div>

          <div className="rounded-lg border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-slate-300">
            Mock analysis mode
          </div>
        </header>

        <main className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(420px,0.95fr)]">
          <section className="rounded-xl border border-white/10 bg-[#1A1D2E]/80 p-5 shadow-2xl shadow-black/30 backdrop-blur">
            <QueryInputPanel onAnalyze={handleAnalyze} loading={loading} />

            {error && (
              <div className="mt-4 rounded-lg border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">
                {error}
              </div>
            )}
          </section>

          <ResultPanel result={result} loading={loading} />
        </main>
      </div>
    </div>
  );
}

export default App;
