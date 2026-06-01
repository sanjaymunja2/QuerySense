import { useEffect, useState } from "react";

function ScoreBadge({ score }) {
  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    let frame = 0;
    const totalFrames = 40;
    const interval = window.setInterval(() => {
      frame += 1;
      setDisplayScore(Math.round((score / totalFrames) * frame));

      if (frame >= totalFrames) {
        window.clearInterval(interval);
        setDisplayScore(score);
      }
    }, 20);

    return () => window.clearInterval(interval);
  }, [score]);

  const colorClass =
    score <= 50
      ? "text-red-300 stroke-red-400"
      : score <= 75
        ? "text-amber-300 stroke-amber-400"
        : "text-green-300 stroke-green-400";

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-white/10 bg-[#111827] p-6">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            className="stroke-slate-800"
            cx="60"
            cy="60"
            fill="none"
            r={radius}
            strokeWidth="10"
          />
          <circle
            className={`transition-all duration-300 ${colorClass}`}
            cx="60"
            cy="60"
            fill="none"
            r={radius}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            strokeWidth="10"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-4xl font-black ${colorClass.split(" ")[0]}`}>
            {displayScore}
          </span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
            /100
          </span>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-300">
        Query Health Score
      </p>
    </div>
  );
}

export default ScoreBadge;
