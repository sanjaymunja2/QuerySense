import { useState } from 'react';
import QueryInputPanel from './components/QueryInputPanel';
import ResultPanel from './components/ResultPanel';
import { analyzeQuery } from './services/api';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeNav, setActiveNav] = useState('analyzer');

  const handleAnalyze = async (data) => {
    setError("");
    setResult(null);

    if (!data.query.trim()) {
      setError("Enter a SQL query before running analysis.");
      return;
    }

    setLoading(true);

    try {
      const analysis = await analyzeQuery({ query: data.query });
      setResult({
        ...analysis,
        issues: analysis.issues || []
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F5F4F0] text-[#1C1814]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.28]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, rgba(100, 94, 85, 0.34) 1px, transparent 0)',
          backgroundSize: '26px 26px'
        }}
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute -left-28 top-20 h-80 w-80 animate-[pulse_8s_ease-in-out_infinite] rounded-full bg-[#D4860A]/20 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute right-[-8rem] top-40 h-96 w-96 animate-[pulse_10s_ease-in-out_infinite] rounded-full bg-[#B36F05]/16 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-[-10rem] left-1/3 h-[28rem] w-[28rem] animate-[pulse_12s_ease-in-out_infinite] rounded-full bg-[#E2DDD5]/70 blur-3xl" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] flex-col px-4 py-4 sm:px-6 lg:px-8">
        <header className="sticky top-4 z-20 rounded-2xl border border-[#E2DDD5]/80 bg-white/82 px-4 py-3 shadow-sm shadow-[#1C1814]/5 backdrop-blur-xl">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <a href="/" className="flex items-center gap-3" aria-label="QuerySense home">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#B36F05] text-sm font-black text-white shadow-lg shadow-[#B36F05]/20">
                QS
              </span>
              <span className="text-lg font-black tracking-tight text-[#1C1814]">
                Query<span className="text-[#B36F05]">Sense</span>
              </span>
            </a>

            <nav className="flex flex-wrap items-center gap-1 rounded-xl border border-[#E2DDD5] bg-[#F5F4F0]/70 p-1" role="navigation" aria-label="Main">
              {['analyzer', 'history', 'docs', 'about'].map((item) => (
                <button
                  key={item}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition duration-200 ${
                    activeNav === item
                      ? 'bg-white text-[#B36F05] shadow-sm'
                      : 'text-[#645E55] hover:bg-white/70 hover:text-[#1C1814]'
                  }`}
                  onClick={() => setActiveNav(item)}
                  type="button"
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <a
                href="https://github.com"
                className="inline-flex items-center gap-2 rounded-xl border border-[#E2DDD5] bg-white px-3 py-2 text-sm font-semibold text-[#645E55] transition duration-200 hover:border-[#B36F05]/40 hover:text-[#1C1814] hover:shadow-sm"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
                GitHub
              </a>
              <button
                className="rounded-xl bg-[#B36F05] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-[#B36F05]/20 transition duration-200 hover:-translate-y-0.5 hover:bg-[#8C5603] hover:shadow-[#B36F05]/30"
                onClick={() => {}}
                type="button"
              >
                Get API Key
              </button>
            </div>
          </div>
        </header>

        <main className="flex-1 py-8 lg:py-10" id="main-content">
          <section className="mb-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px] lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#E2DDD5] bg-white/72 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#B36F05] shadow-sm backdrop-blur">
                SQL Analysis Dashboard
              </div>
              <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-[#1C1814] sm:text-5xl lg:text-6xl">
                Analyze SQL before it reaches production.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-[#645E55] sm:text-lg">
                Review query health, identify risky clauses, and compare optimized rewrites in a focused SaaS workspace for developers.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 rounded-2xl border border-[#E2DDD5]/80 bg-white/70 p-3 shadow-sm shadow-[#1C1814]/5 backdrop-blur-xl">
              {[
                ['Rules', 'Static scan'],
                ['Score', 'Health metric'],
                ['Rewrite', 'SQL diff']
              ].map(([title, label]) => (
                <div key={title} className="rounded-xl border border-[#E2DDD5] bg-white px-3 py-4">
                  <p className="text-sm font-black text-[#1C1814]">{title}</p>
                  <p className="mt-1 text-xs font-medium text-[#645E55]">{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="grid gap-6 xl:grid-cols-[minmax(420px,0.88fr)_minmax(0,1.12fr)]">
            <div className="rounded-2xl border border-[#E2DDD5]/90 bg-white/76 p-4 shadow-xl shadow-[#1C1814]/[0.06] backdrop-blur-xl sm:p-5">
              <QueryInputPanel
                onAnalyze={handleAnalyze}
                loading={loading}
              />
              {error && (
                <div className="mt-4 rounded-xl border border-[#DC2626]/20 bg-[#DC2626]/10 px-4 py-3 text-sm font-semibold text-[#DC2626]">
                  {error}
                </div>
              )}
            </div>
            <div className="rounded-2xl border border-[#E2DDD5]/90 bg-white/64 p-4 shadow-xl shadow-[#1C1814]/[0.06] backdrop-blur-xl sm:p-5">
              <ResultPanel result={result} loading={loading} />
            </div>
          </section>
        </main>

        <footer className="flex flex-col gap-3 border-t border-[#E2DDD5] py-5 text-sm text-[#645E55] sm:flex-row sm:items-center sm:justify-between">
          <span className="font-semibold">QuerySense - Intelligent SQL Analysis</span>
          <div className="flex flex-wrap gap-2">
            {['Java 17', 'Spring Boot 3', 'JSQLParser', 'React 18'].map((tag) => (
              <span className="rounded-full border border-[#E2DDD5] bg-white/70 px-3 py-1 text-xs font-semibold" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
}

function GithubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  );
}
