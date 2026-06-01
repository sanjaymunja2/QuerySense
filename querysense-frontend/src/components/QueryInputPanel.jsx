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
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-semibold text-slate-200">
            SQL Query
          </label>
          <span className="rounded-full bg-blue-500/10 px-2.5 py-1 text-xs font-medium text-blue-300">
            editor
          </span>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#0B0F19] shadow-inner shadow-black/40 transition focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-500/30">
          <div className="flex items-center gap-2 border-b border-slate-800 bg-[#111827] px-4 py-2">
            <span className="h-3 w-3 rounded-full bg-red-400"></span>
            <span className="h-3 w-3 rounded-full bg-amber-400"></span>
            <span className="h-3 w-3 rounded-full bg-green-400"></span>
            <span className="ml-2 text-xs text-slate-500">query.sql</span>
          </div>

          <div className="flex min-h-[300px]">
            <div className="select-none border-r border-slate-800 bg-[#090D15] px-3 py-4 text-right font-mono text-sm leading-6 text-slate-600">
              {Array.from({ length: queryLines }, (_, index) => (
                <div key={index}>{index + 1}</div>
              ))}
            </div>

            <textarea
              className="min-h-[300px] w-full resize-y bg-transparent px-4 py-4 font-mono text-sm leading-6 text-slate-100 caret-blue-400 outline-none placeholder:text-slate-600"
              placeholder="SELECT * FROM users WHERE ..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              spellCheck="false"
            />
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-700 bg-[#111827]">
        <button
          className="flex w-full items-center justify-between px-4 py-3 text-left"
          onClick={() => setSchemaOpen(!schemaOpen)}
          type="button"
        >
          <span className="text-sm font-semibold text-slate-200">
            Schema JSON
          </span>
          <span className="text-sm text-slate-400">
            {schemaOpen ? "Hide" : "Show"}
          </span>
        </button>

        {schemaOpen && (
          <textarea
            className="min-h-[180px] w-full resize-y border-t border-slate-800 bg-[#0B0F19] px-4 py-4 font-mono text-sm leading-6 text-slate-100 outline-none transition placeholder:text-slate-600 focus:ring-2 focus:ring-blue-500/30"
            placeholder='[{ "tableName": "users", "columns": ["id", "name"] }]'
            value={schema}
            onChange={(event) => setSchema(event.target.value)}
            spellCheck="false"
          />
        )}
      </div>

      <button
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-500 px-5 py-4 text-base font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:bg-blue-400 hover:shadow-blue-500/30 disabled:cursor-not-allowed disabled:opacity-70"
        disabled={loading}
        onClick={handleSubmit}
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
