import IssueCard from "./IssueCard";
import QueryDiff from "./QueryDiff";
import ScoreBadge from "./ScoreBadge";

function ResultPanel({ result, loading }) {
  if (loading) {
    return (
      <section className="flex min-h-[560px] items-center justify-center rounded-2xl border border-[#E2DDD5] bg-white p-6 shadow-sm">
        <div className="text-center">
          <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-[#E2DDD5] border-t-[#B36F05]"></div>
          <h2 className="text-xl font-black text-[#1C1814]">Analyzing query</h2>
          <p className="mt-2 text-sm leading-6 text-[#645E55]">
            Scanning syntax, rules, and rewrite opportunities.
          </p>
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="flex min-h-[560px] items-center justify-center rounded-2xl border border-dashed border-[#D0C8BD] bg-white/70 p-8">
        <div className="max-w-sm text-center">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#E2DDD5] bg-[#F5F4F0] font-mono text-lg font-black text-[#B36F05]">
            SQL
          </div>
          <h2 className="text-xl font-black text-[#1C1814]">Ready for analysis</h2>
          <p className="mt-3 text-sm leading-6 text-[#645E55]">
            Enter a query and run analysis to see health score, issues, rewrites, and optimization notes.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="animate-[fadeIn_0.35s_ease-out] space-y-5">
      <div className="grid gap-5 xl:grid-cols-[210px_minmax(0,1fr)]">
        <ScoreBadge score={result.score} />

        <div className="rounded-2xl border border-[#E2DDD5] bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B36F05]">
                Findings
              </p>
              <h2 className="mt-1 text-xl font-black text-[#1C1814]">Issues Panel</h2>
            </div>
            <span className="rounded-full border border-[#E2DDD5] bg-[#F5F4F0] px-3 py-1 text-xs font-bold text-[#645E55]">
              {result.issues.length} detected
            </span>
          </div>

          <div className="space-y-4">
            {result.issues.length > 0 ? (
              result.issues.map((issue, index) => (
                <IssueCard key={index} issue={issue} />
              ))
            ) : (
              <p className="rounded-xl border border-[#16A34A]/20 bg-[#16A34A]/10 p-4 text-sm font-semibold text-[#166534]">
                No issues found.
              </p>
            )}
          </div>
        </div>
      </div>

      <section className="rounded-2xl border border-[#E2DDD5] bg-white p-5 shadow-sm">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B36F05]">
              Comparison
            </p>
            <h2 className="mt-1 text-xl font-black text-[#1C1814]">Query Diff</h2>
          </div>
          <span className="rounded-full border border-[#E2DDD5] bg-[#F5F4F0] px-3 py-1 text-xs font-bold text-[#645E55]">
            side by side
          </span>
        </div>
        <QueryDiff
          originalQuery={result.originalQuery}
          optimizedQuery={result.optimizedQuery}
        />
      </section>

      <section className="rounded-2xl border border-[#E2DDD5] bg-white p-5 shadow-sm">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B36F05]">
          Notes
        </p>
        <h2 className="mt-1 text-xl font-black text-[#1C1814]">Rewrite Explanation</h2>
        <p className="mt-3 leading-7 text-[#645E55]">
          {result.explanation || result.rewriteExplanation || "No rewrite needed."}
        </p>
      </section>
    </section>
  );
}

export default ResultPanel;
