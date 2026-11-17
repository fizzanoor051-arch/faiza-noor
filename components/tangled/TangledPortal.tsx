
"use client";

import { useRef, type PointerEvent } from "react";
import "./tangled-world.css";

type Props = {
  name: string;
  role: string;
};

/**
 * Professional 3D portfolio portrait portal.
 * Keeps the original portal tilt, orbit, frame and badge effects.
 * The Tangled character has been removed and replaced with a profile photo.
 */
export default function TangledPortal({ name, role }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;

    const b = el.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5;
    const y = (e.clientY - b.top) / b.height - 0.5;

    el.classList.add("is-active");
    el.style.setProperty("--ry", `${(x * 22).toFixed(2)}deg`);
    el.style.setProperty("--rx", `${(-y * 18).toFixed(2)}deg`);
    el.style.setProperty("--px", (x * 2).toFixed(3));
    el.style.setProperty("--py", (y * 2).toFixed(3));
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;

    el.classList.remove("is-active");
    el.style.setProperty("--ry", "0deg");
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--px", "0");
    el.style.setProperty("--py", "0");
  };

  return (
    <div
      ref={ref}
      className="tg-portal"
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <div className="tg-portal-card">
        {/* Existing 3D orbit effect */}
        <div className="tg-portal-orbit" aria-hidden="true" />

        {/* Existing portal frame */}
        <div className="tg-portal-frame">
          <div className="tg-portal-view">
            {/* Your own professional profile picture */}
            <img
              className="tg-portal-img"
              src="/images/faiza-profile.jpg"
              alt={`${name} - ${role}`}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center top",
              }}
            />
          </div>
        </div>

        {/* Original character removed */}

        {/* Existing animated name and role badge */}
        <div className="tg-portal-badge">
          <strong>{name}</strong>
          <span>{role}</span>
        </div>
      </div>
    </div>
  );
}
