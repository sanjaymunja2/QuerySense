function QueryDiff({ originalQuery, optimizedQuery }) {
  const copyQuery = (query) => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(query || "");
    }
  };

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-[#DC2626]/20 bg-[#FFF8F7] shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[#DC2626]/15 bg-[#DC2626]/[0.06] px-4 py-3">
          <h3 className="text-sm font-black text-[#B91C1C]">Original Query</h3>
          <button
            className="rounded-lg border border-[#DC2626]/20 bg-white px-2.5 py-1 text-xs font-bold text-[#B91C1C] transition duration-200 hover:bg-[#DC2626]/10"
            onClick={() => copyQuery(originalQuery)}
            type="button"
          >
            Copy
          </button>
        </div>
        <pre className="min-h-[170px] overflow-auto whitespace-pre-wrap p-4 font-mono text-sm leading-6 text-[#1C1814]">
          <span className="rounded bg-[#DC2626]/10 px-1 text-[#7F1D1D]">{originalQuery}</span>
        </pre>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#16A34A]/20 bg-[#F7FFF9] shadow-sm">
        <div className="flex items-center justify-between gap-3 border-b border-[#16A34A]/15 bg-[#16A34A]/[0.06] px-4 py-3">
          <h3 className="text-sm font-black text-[#166534]">Optimized Query</h3>
          <button
            className="rounded-lg border border-[#16A34A]/20 bg-white px-2.5 py-1 text-xs font-bold text-[#166534] transition duration-200 hover:bg-[#16A34A]/10"
            onClick={() => copyQuery(optimizedQuery)}
            type="button"
          >
            Copy
          </button>
        </div>
        <pre className="min-h-[170px] overflow-auto whitespace-pre-wrap p-4 font-mono text-sm leading-6 text-[#1C1814]">
          <span className="rounded bg-[#16A34A]/10 px-1 text-[#14532D]">{optimizedQuery}</span>
        </pre>
      </div>
    </div>
  );
}

export default QueryDiff;
