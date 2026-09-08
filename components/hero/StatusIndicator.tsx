
"use client";

import { useEffect, useState } from "react";

export default function StatusIndicator() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setTime(
        new Intl.DateTimeFormat("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
          timeZone: "Asia/Karachi",
        }).format(new Date())
      );
    };

    updateTime();

    const interval = window.setInterval(updateTime, 1000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex max-w-full items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-3 py-2 backdrop-blur-xl">
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
      </span>

      <span className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/55">
        Available for select projects
      </span>

      <span className="hidden h-3 w-px bg-white/10 sm:block" />

      <span className="hidden font-mono text-[8px] tracking-[0.12em] text-white/20 sm:block">
        PKT {time || "--:--:--"}
      </span>
    </div>
  );
}
