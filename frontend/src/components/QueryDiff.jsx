function QueryDiff({ originalQuery, optimizedQuery }) {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="overflow-hidden rounded-xl border border-red-400/20 bg-[#0B0F19]">
        <div className="border-b border-slate-800 bg-red-500/10 px-4 py-3">
          <h3 className="text-sm font-bold text-red-200">Original Query</h3>
        </div>
        <pre className="min-h-[150px] whitespace-pre-wrap p-4 font-mono text-sm leading-6 text-slate-100">
          <span className="rounded bg-red-500/20 px-1 text-red-100">{originalQuery}</span>
        </pre>
      </div>

      <div className="overflow-hidden rounded-xl border border-green-400/20 bg-[#0B0F19]">
        <div className="border-b border-slate-800 bg-green-500/10 px-4 py-3">
          <h3 className="text-sm font-bold text-green-200">Optimized Query</h3>
        </div>
        <pre className="min-h-[150px] whitespace-pre-wrap p-4 font-mono text-sm leading-6 text-slate-100">
          <span className="rounded bg-green-500/20 px-1 text-green-100">{optimizedQuery}</span>
        </pre>
      </div>
    </div>
  );
}

export default QueryDiff;
