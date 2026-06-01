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

  const state =
    score <= 50
      ? {
          label: "Critical",
          text: "text-[#DC2626]",
          stroke: "stroke-[#DC2626]",
          bg: "bg-[#DC2626]/10",
          border: "border-[#DC2626]/20"
        }
      : score <= 75
        ? {
            label: "Warning",
            text: "text-[#D4860A]",
            stroke: "stroke-[#D4860A]",
            bg: "bg-[#D4860A]/10",
            border: "border-[#D4860A]/25"
          }
        : {
            label: "Healthy",
            text: "text-[#16A34A]",
            stroke: "stroke-[#16A34A]",
            bg: "bg-[#16A34A]/10",
            border: "border-[#16A34A]/20"
          };

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-[#E2DDD5] bg-white p-6 shadow-sm">
      <div className="relative h-36 w-36">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 120 120">
          <circle
            className="stroke-[#EFEAE2]"
            cx="60"
            cy="60"
            fill="none"
            r={radius}
            strokeWidth="10"
          />
          <circle
            className={`transition-all duration-300 ${state.stroke}`}
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
          <span className={`text-4xl font-black ${state.text}`}>
            {displayScore}
          </span>
          <span className="text-xs font-bold uppercase tracking-[0.16em] text-[#645E55]">
            /100
          </span>
        </div>
      </div>
      <p className="mt-4 text-center text-sm font-black text-[#1C1814]">
        Query Health Score
      </p>
      <span className={`mt-3 rounded-full border px-3 py-1 text-xs font-black uppercase tracking-[0.14em] ${state.bg} ${state.border} ${state.text}`}>
        {state.label}
      </span>
    </div>
  );
}

export default ScoreBadge;
