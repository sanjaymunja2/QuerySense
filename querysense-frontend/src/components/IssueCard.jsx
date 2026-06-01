function IssueCard({ issue }) {
  const getSeverityClass = (severity) => {
    switch (severity) {
      case "CRITICAL":
        return "border-[#DC2626]/20 bg-[#DC2626]/10 text-[#DC2626]";

      case "WARNING":
        return "border-[#D4860A]/25 bg-[#D4860A]/10 text-[#9A5C00]";

      default:
        return "border-[#B36F05]/20 bg-[#B36F05]/10 text-[#8C5603]";
    }
  };

  return (
    <div className="group rounded-2xl border border-[#E2DDD5] bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-[#B36F05]/35 hover:shadow-lg hover:shadow-[#1C1814]/[0.07]">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div className={`inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${getSeverityClass(issue.severity)}`}>
          {issue.severity}
        </div>
        <span className="text-lg leading-none text-[#B36F05] transition duration-200 group-hover:translate-x-0.5">
          +
        </span>
      </div>

      <h3 className="text-lg font-black text-[#1C1814]">{issue.title}</h3>

      <p className="mt-3 text-sm leading-6 text-[#645E55]">
        {issue.description}
      </p>

      <p className="mt-4 rounded-xl border border-[#E2DDD5] bg-[#F5F4F0] p-3 text-sm leading-6 text-[#645E55]">
        <span className="font-black text-[#8C5603]">Suggestion:</span> {issue.suggestion}
      </p>

      <div className="mt-4 inline-flex rounded-lg border border-[#E2DDD5] bg-[#FFFDF9] px-3 py-1.5 font-mono text-xs font-semibold text-[#645E55]">
        {issue.affectedClause}
      </div>
    </div>
  );
}

export default IssueCard;
