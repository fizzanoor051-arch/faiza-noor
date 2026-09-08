
"use client";

import { useEffect, useState } from "react";

type PageLoaderProps = {
  visible?: boolean;
};

export default function PageLoader({
  visible = false,
}: PageLoaderProps) {
  const [active, setActive] = useState(visible);

  useEffect(() => {
    setActive(visible);
  }, [visible]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      setActive(true);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  if (!active) return null;

  return (
    <div
      className="fixed inset-0 z-[190] flex items-center justify-center bg-[#030307]"
      aria-hidden="true"
    >
      <div className="relative">
        {/* Outer ring */}
        <div className="h-16 w-16 animate-spin rounded-full border border-white/10 border-t-violet-400" />

        {/* Inner ring */}
        <div
          className="absolute inset-2 animate-spin rounded-full border border-white/5 border-b-cyan-300/70"
          style={{
            animationDirection: "reverse",
            animationDuration: "1.4s",
          }}
        />

        {/* Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[8px] font-semibold tracking-[0.15em] text-white/50">
            FN
          </span>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 text-center">
        <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-white/20">
          Loading experience...
        </span>
      </div>
    </div>
  );
}
