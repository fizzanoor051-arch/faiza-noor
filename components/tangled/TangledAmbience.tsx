"use client";

import { useEffect, useMemo, useRef } from "react";
import "./tangled-world.css";

type Props = {
  /** 0 – 1, how visible the painted backdrop is */
  opacity?: number;
  /** number of drifting lanterns */
  lanterns?: number;
};

/**
 * Golden Tangled-style backdrop: the painted kingdom stays in view
 * (sticky) while lanterns drift upward in several depth layers and
 * react slightly to the mouse for a 3D parallax feeling.
 */
export default function TangledAmbience({
  opacity = 0.5,
  lanterns = 15,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () =>
      Array.from({ length: lanterns }, (_, i) => {
        const layer = i % 3; // 0 far · 1 mid · 2 near
        return {
          id: i,
          x: (i * 37 + 9) % 94,
          w: [16, 26, 40][layer] + ((i * 7) % 8),
          depth: [6, 14, 30][layer],
          dur: [34, 26, 19][layer] + ((i * 5) % 9),
          del: -((i * 3.7) % 30),
          sway: ((i % 2 === 0 ? 1 : -1) * (14 + ((i * 11) % 30))),
          blur: [1.4, 0.4, 0][layer],
          op: [0.55, 0.8, 0.95][layer],
          fd: -((i * 0.7) % 3),
        };
      }),
    [lanterns],
  );

  const sparks = useMemo(
    () =>
      Array.from({ length: 26 }, (_, i) => ({
        id: i,
        left: (i * 29 + 5) % 100,
        top: (i * 47 + 13) % 100,
        s: 2 + (i % 3),
        t: 3 + (i % 5) * 0.6,
        sd: -((i * 0.53) % 4),
      })),
    [],
  );

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let nx = 0;
    let ny = 0;

    const onMove = (e: PointerEvent) => {
      nx = (e.clientX / window.innerWidth - 0.5) * 2;
      ny = (e.clientY / window.innerHeight - 0.5) * 2;
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        el.style.setProperty("--mx", nx.toFixed(3));
        el.style.setProperty("--my", ny.toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="tg-amb"
      aria-hidden="true"
      style={{ ["--tg-amb-opacity" as string]: opacity }}
    >
      <div className="tg-amb-stick">
        <div className="tg-amb-img" />
        <div className="tg-amb-wash" />

        {sparks.map((s) => (
          <span
            key={s.id}
            className="tg-spark"
            style={{
              left: `${s.left}%`,
              top: `${s.top}%`,
              ["--s" as string]: `${s.s}px`,
              ["--t" as string]: `${s.t}s`,
              ["--sd" as string]: `${s.sd}s`,
            }}
          />
        ))}

        {items.map((l) => (
          <div
            key={l.id}
            className="tg-amb-lan"
            style={{
              ["--x" as string]: `${l.x}%`,
              ["--depth" as string]: l.depth,
            }}
          >
            <span
              style={{
                ["--dur" as string]: `${l.dur}s`,
                ["--del" as string]: `${l.del}s`,
                ["--sway" as string]: `${l.sway}px`,
              }}
            >
              <b
                className="tg-lantern"
                style={{
                  ["--w" as string]: `${l.w}px`,
                  ["--blur" as string]: `${l.blur}px`,
                  ["--op" as string]: l.op,
                  ["--fd" as string]: `${l.fd}s`,
                }}
              >
                <i />
              </b>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
