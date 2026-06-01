import { useState } from "react";

function QueryInputPanel({ onAnalyze, loading }) {
  const [query, setQuery] = useState("SELECT * FROM users");
  const [schema, setSchema] = useState(`[
  {
    "tableName": "users",
    "columns": ["id", "name", "email", "created_at"]
  }
]`);
  const [schemaOpen, setSchemaOpen] = useState(true);

  const queryLines = Math.max(query.split("\n").length, 8);

  const handleSubmit = () => {
    onAnalyze({
      query,
      schema
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#B36F05]">
            Input
          </p>
          <h2 className="mt-1 text-xl font-black tracking-tight text-[#1C1814]">
            SQL Query
          </h2>
        </div>
        <span className="inline-flex w-fit rounded-full border border-[#E2DDD5] bg-[#F5F4F0] px-3 py-1 text-xs font-bold text-[#645E55]">
          query.sql
        </span>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2DDD5] bg-white shadow-sm transition duration-200 focus-within:border-[#B36F05]/70 focus-within:ring-4 focus-within:ring-[#B36F05]/10">
        <div className="flex items-center justify-between border-b border-[#E2DDD5] bg-[#F5F4F0] px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#DC2626]/75"></span>
            <span className="h-3 w-3 rounded-full bg-[#D4860A]/75"></span>
            <span className="h-3 w-3 rounded-full bg-[#16A34A]/75"></span>
          </div>
          <span className="rounded-md border border-[#E2DDD5] bg-white px-2 py-1 font-mono text-[11px] font-semibold text-[#645E55]">
            SQL
          </span>
        </div>

        <div className="flex min-h-[320px] bg-[#FFFDF9]">
          <div className="select-none border-r border-[#E2DDD5] bg-[#F5F4F0] px-3 py-4 text-right font-mono text-sm leading-6 text-[#A59C90]">
            {Array.from({ length: queryLines }, (_, index) => (
              <div key={index}>{index + 1}</div>
            ))}
          </div>

          <textarea
            className="min-h-[320px] w-full resize-y bg-transparent px-4 py-4 font-mono text-sm leading-6 text-[#1C1814] caret-[#B36F05] outline-none placeholder:text-[#A59C90]"
            placeholder="SELECT * FROM users WHERE ..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            spellCheck="false"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-[#E2DDD5] bg-white shadow-sm transition duration-200 hover:shadow-md hover:shadow-[#1C1814]/5">
        <button
          className="flex w-full items-center justify-between bg-[#F5F4F0] px-4 py-3 text-left transition duration-200 hover:bg-[#EFEAE2]"
          onClick={() => setSchemaOpen(!schemaOpen)}
          type="button"
        >
          <span className="text-sm font-black text-[#1C1814]">
            Schema JSON
          </span>
          <span className="rounded-full border border-[#E2DDD5] bg-white px-2.5 py-1 text-xs font-bold text-[#645E55]">
            {schemaOpen ? "Hide" : "Show"}
          </span>
        </button>

        {schemaOpen && (
          <textarea
            className="min-h-[190px] w-full resize-y border-t border-[#E2DDD5] bg-[#FFFDF9] px-4 py-4 font-mono text-sm leading-6 text-[#1C1814] outline-none transition placeholder:text-[#A59C90] focus:ring-4 focus:ring-[#B36F05]/10"
            placeholder='[{ "tableName": "users", "columns": ["id", "name"] }]'
            value={schema}
            onChange={(event) => setSchema(event.target.value)}
            spellCheck="false"
          />
        )}
      </div>

      <button
        className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#B36F05] px-5 py-4 text-base font-black text-white shadow-lg shadow-[#B36F05]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#8C5603] hover:shadow-[#B36F05]/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        disabled={loading}
        onClick={handleSubmit}
        type="button"
      >
        {loading && (
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/40 border-t-white"></span>
        )}
        {loading ? "Analyzing Query" : "Analyze Query"}
      </button>
    </div>
  );
}

export default QueryInputPanel;
