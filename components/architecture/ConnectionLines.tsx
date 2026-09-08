"use client";

type ConnectionLinesProps = {
  activeId: string;
};

const connections = [
  {
    id: "interface",
    top: "18%",
  },
  {
    id: "application",
    top: "38%",
  },
  {
    id: "api",
    top: "58%",
  },
  {
    id: "data",
    top: "78%",
  },
];

export default function ConnectionLines({
  activeId,
}: ConnectionLinesProps) {
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      {/* Main vertical connection */}
      <div className="absolute bottom-[11%] left-1/2 top-[10%] w-px -translate-x-1/2 bg-gradient-to-b from-purple-400/20 via-white/10 to-cyan-300/15" />

      {/* Animated signal */}
      <div className="absolute left-1/2 top-[10%] h-20 w-px -translate-x-1/2 overflow-hidden">
        <div className="h-8 w-full animate-[architectureFlow_3s_linear_infinite] bg-gradient-to-b from-transparent via-cyan-300/70 to-transparent" />
      </div>

      {/* Node connection points */}
      {connections.map((connection) => {
        const active = connection.id === activeId;

        return (
          <div
            key={connection.id}
            className="absolute left-1/2 -translate-x-1/2"
            style={{
              top: connection.top,
            }}
          >
            <div
              className={`h-3 w-3 rounded-full border transition-all duration-500 ${
                active
                  ? "border-purple-200/60 bg-purple-300/50 shadow-[0_0_18px_rgba(192,132,252,0.8)]"
                  : "border-white/15 bg-[#08080f]"
              }`}
            />
          </div>
        );
      })}

      {/* Side data paths */}
      <div className="absolute left-[8%] top-[27%] hidden h-px w-[28%] bg-gradient-to-r from-transparent via-purple-300/10 to-transparent lg:block" />

      <div className="absolute right-[8%] top-[48%] hidden h-px w-[28%] bg-gradient-to-r from-transparent via-cyan-300/10 to-transparent lg:block" />

      <div className="absolute left-[8%] top-[69%] hidden h-px w-[28%] bg-gradient-to-r from-transparent via-blue-300/10 to-transparent lg:block" />

      {/* Architecture brackets */}
      <div className="absolute left-4 top-[8%] hidden h-[82%] w-5 border-b border-l border-t border-white/5 lg:block" />

      <div className="absolute right-4 top-[8%] hidden h-[82%] w-5 border-b border-r border-t border-white/5 lg:block" />

      {/* Corner markers */}
      <span className="absolute left-6 top-6 h-2 w-2 border-l border-t border-white/15" />
      <span className="absolute right-6 top-6 h-2 w-2 border-r border-t border-white/15" />
      <span className="absolute bottom-6 left-6 h-2 w-2 border-b border-l border-white/15" />
      <span className="absolute bottom-6 right-6 h-2 w-2 border-b border-r border-white/15" />
    </div>
  );
}