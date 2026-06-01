import IssueCard from "./IssueCard";
import QueryDiff from "./QueryDiff";
import ScoreBadge from "./ScoreBadge";

function ResultPanel({ result, loading }) {
  if (loading) {
    return (
      <section className="flex min-h-[540px] items-center justify-center rounded-xl border border-white/10 bg-[#1A1D2E]/80 p-6 shadow-2xl shadow-black/30">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-blue-400/20 border-t-blue-400"></div>
          <h2 className="text-xl font-bold text-white">Analyzing query</h2>
          <p className="mt-2 text-sm text-slate-400">
            Scanning syntax, rules, and rewrite opportunities.
          </p>
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="flex min-h-[540px] items-center justify-center rounded-xl border border-dashed border-white/10 bg-[#1A1D2E]/50 p-8">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 font-mono text-lg font-bold text-blue-300">
            SQL
          </div>
          <h2 className="text-xl font-bold text-white">Ready for analysis</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Enter a query and run analysis to see health score, issues, rewrites, and optimization notes.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-white/10 bg-[#1A1D2E]/80 p-5 shadow-2xl shadow-black/30 animate-[fadeIn_0.35s_ease-out]">
      <div className="grid gap-5 xl:grid-cols-[180px_minmax(0,1fr)]">
        <ScoreBadge score={result.score} />

        <div className="rounded-xl border border-white/10 bg-[#111827] p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold text-white">Issues Panel</h2>
            <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {result.issues.length} detected
            </span>
          </div>

          <div className="space-y-4">
            {result.issues.length > 0 ? (
              result.issues.map((issue, index) => (
                <IssueCard key={index} issue={issue} />
              ))
            ) : (
              <p className="rounded-lg border border-green-400/20 bg-green-500/10 p-4 text-sm text-green-200">
                No issues found.
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="mt-5 rounded-xl border border-white/10 bg-[#111827] p-5">
        <div className="mb-4 flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-white">Query Comparison</h2>
          <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-300">
            diff view
          </span>
        </div>
        <QueryDiff
          originalQuery={result.originalQuery}
          optimizedQuery={result.optimizedQuery}
        />
      </section>

      <section className="mt-5 rounded-xl border border-white/10 bg-[#111827] p-5">
        <h2 className="text-xl font-bold text-white">Rewrite Explanation</h2>
        <p className="mt-3 leading-7 text-slate-300">
          {result.explanation || result.rewriteExplanation || "No rewrite needed."}
        </p>
      </section>
    </section>
  );
}

export default ResultPanel;
