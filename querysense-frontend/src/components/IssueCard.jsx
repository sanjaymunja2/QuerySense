function IssueCard({ issue }) {
  const getSeverityClass = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "border-red-400/30 bg-red-500/10 text-red-200";

      case "WARNING":
        return "border-amber-400/30 bg-amber-500/10 text-amber-200";

      default:
        return "border-blue-400/30 bg-blue-500/10 text-blue-200";
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#111827] p-5 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-blue-400/30 hover:shadow-blue-500/10">
      <div className={`mb-4 inline-flex rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${getSeverityClass(issue.severity)}`}>
        {issue.severity}
      </div>

      <h3 className="text-lg font-bold text-white">{issue.title}</h3>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {issue.description}
      </p>

      <p className="mt-3 rounded-lg bg-white/[0.03] p-3 text-sm leading-6 text-slate-300">
        <span className="font-semibold text-blue-300">Suggestion:</span> {issue.suggestion}
      </p>

      <div className="mt-4 inline-flex rounded-md border border-slate-700 bg-[#0B0F19] px-2.5 py-1 font-mono text-xs text-slate-300">
        {issue.affectedClause}
      </div>
    </div>
  );
}

export default IssueCard;
