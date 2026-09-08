"use client";

const weeks = 24;
const days = 7;

function getIntensity(week: number, day: number) {
  const value = (week * 17 + day * 11 + week * day * 3) % 10;

  if (value <= 2) return 0;
  if (value <= 4) return 1;
  if (value <= 6) return 2;
  if (value <= 8) return 3;

  return 4;
}

const intensityClasses = [
  "bg-white/[0.045]",
  "bg-cyan-950/70",
  "bg-cyan-800/70",
  "bg-cyan-600/75",
  "bg-cyan-400/90",
];

export default function ContributionGraph() {
  return (
    <div>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white/75">
            Engineering activity
          </p>

          <p className="mt-1 text-xs text-white/30">
            Recent development rhythm
          </p>
        </div>

        <div className="flex items-center gap-2 text-[10px] text-white/30">
          <span>Less</span>

          {intensityClasses.map((className, index) => (
            <span
              key={index}
              className={`h-3 w-3 rounded-[3px] ${className}`}
            />
          ))}

          <span>More</span>
        </div>
      </div>

      {/* Graph */}
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-[680px] gap-1.5">
          {Array.from({ length: weeks }).map((_, week) => (
            <div
              key={week}
              className="flex flex-1 flex-col gap-1.5"
            >
              {Array.from({ length: days }).map((_, day) => {
                const intensity = getIntensity(week, day);

                return (
                  <div
                    key={`${week}-${day}`}
                    className={`aspect-square w-full rounded-[3px] transition-all duration-300 hover:scale-125 hover:ring-1 hover:ring-cyan-300/50 ${intensityClasses[intensity]}`}
                    title={`Activity level ${intensity}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Labels */}
      <div className="mt-4 flex justify-between font-mono text-[9px] uppercase tracking-widest text-white/20">
        <span>24 weeks ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}