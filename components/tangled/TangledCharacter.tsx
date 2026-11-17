"use client";

import { useId } from "react";
import "./tangled-world.css";

/**
 * ORIGINAL illustrated character (not a Disney asset):
 * a girl seen from behind with a very long golden braid, releasing a
 * glowing lantern into the evening sky. Drawn as inline SVG so it stays
 * sharp on every screen and can be animated with CSS.
 */
export default function TangledCharacter({
  className = "",
}: {
  className?: string;
}) {
  const uid = useId().replace(/:/g, "");
  const hair = `hair-${uid}`;
  const dress = `dress-${uid}`;
  const skirt = `skirt-${uid}`;
  const lan = `lan-${uid}`;
  const glow = `glow-${uid}`;

  return (
    <svg
      className={`tg-char ${className}`}
      viewBox="0 0 240 460"
      role="img"
      aria-label="Illustration of a girl with a long golden braid releasing a glowing lantern"
    >
      <defs>
        <linearGradient id={hair} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3cc" />
          <stop offset="0.45" stopColor="#ffc95c" />
          <stop offset="1" stopColor="#e7922a" />
        </linearGradient>
        <linearGradient id={dress} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a35be0" />
          <stop offset="1" stopColor="#5a24a0" />
        </linearGradient>
        <linearGradient id={skirt} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a52dc" />
          <stop offset="0.55" stopColor="#6d2fb8" />
          <stop offset="1" stopColor="#3f1a78" />
        </linearGradient>
        <linearGradient id={lan} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff5d0" />
          <stop offset="0.4" stopColor="#ffd27a" />
          <stop offset="1" stopColor="#f08a2a" />
        </linearGradient>
        <radialGradient id={glow}>
          <stop offset="0" stopColor="#ffe3a0" stopOpacity="0.95" />
          <stop offset="0.5" stopColor="#ffb445" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffb445" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ground shadow */}
      <ellipse cx="120" cy="446" rx="96" ry="9" fill="#12062a" opacity="0.45" />

      {/* long braid (behind everything, sways) */}
      <g className="tg-char-braid" style={{ transformOrigin: "120px 100px" }}>
        <path
          d="M120 98 C 110 150 136 182 120 232 C 104 282 142 322 124 374 C 112 410 150 440 200 430"
          fill="none"
          stroke={`url(#${hair})`}
          strokeWidth="17"
          strokeLinecap="round"
        />
        <path
          d="M120 98 C 110 150 136 182 120 232 C 104 282 142 322 124 374 C 112 410 150 440 200 430"
          fill="none"
          stroke="#b5651a"
          strokeOpacity="0.38"
          strokeWidth="17"
          strokeLinecap="round"
          strokeDasharray="5 8"
        />
        <path
          d="M118 100 C 108 150 134 182 118 232 C 102 282 140 322 122 374 C 110 410 148 440 198 430"
          fill="none"
          stroke="#fff7da"
          strokeOpacity="0.8"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="2 11"
        />
        {/* little flowers woven into the braid */}
        {[
          [124, 170],
          [122, 250],
          [128, 338],
          [158, 428],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y} r="4.6" fill="#fff" />
            <circle cx={x} cy={y} r="2" fill="#ffd37a" />
          </g>
        ))}
      </g>

      {/* skirt */}
      <path
        d="M94 176 L146 176 C 172 250 214 340 228 436 C 190 452 50 452 12 436 C 26 340 68 250 94 176 Z"
        fill={`url(#${skirt})`}
      />
      <path
        d="M110 182 C 98 260 72 350 52 440 M120 182 C 120 270 118 360 116 446 M132 182 C 144 262 170 350 190 442"
        fill="none"
        stroke="#d7b6ff"
        strokeOpacity="0.22"
        strokeWidth="2"
      />
      <path
        d="M12 436 C 50 452 190 452 228 436"
        fill="none"
        stroke="#ffd37a"
        strokeOpacity="0.8"
        strokeWidth="3"
      />

      {/* bodice + shoulders */}
      <path
        d="M86 114 C 100 106 140 106 154 114 L 147 178 L 93 178 Z"
        fill={`url(#${dress})`}
      />
      <path d="M92 172 L148 172 L147 184 L93 184 Z" fill="#f0b24a" />

      {/* neck */}
      <path d="M107 98 L133 98 L135 112 L105 112 Z" fill="#f3c7a4" />

      {/* raised arm + lantern */}
      <path
        d="M92 120 L68 102"
        stroke="#8a46cc"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M68 102 L60 58"
        stroke="#f3c7a4"
        strokeWidth="9"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="60" cy="54" r="6.5" fill="#f3c7a4" />

      <g className="tg-char-lantern">
        <circle cx="60" cy="20" r="34" fill={`url(#${glow})`} />
        <line x1="60" y1="48" x2="60" y2="36" stroke="#7a3b12" strokeWidth="1.4" />
        <rect x="48" y="8" width="24" height="29" rx="6" fill={`url(#${lan})`} />
        <rect x="50" y="6" width="20" height="4" rx="2" fill="#7a3b12" />
        <rect x="50" y="35" width="20" height="4" rx="2" fill="#7a3b12" />
        <path
          d="M56 12 C 52 20 52 28 56 34 M64 12 C 68 20 68 28 64 34"
          fill="none"
          stroke="#b35a16"
          strokeOpacity="0.35"
        />
      </g>

      {/* other arm */}
      <path
        d="M150 120 L170 152"
        stroke="#8a46cc"
        strokeWidth="13"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M170 152 L167 192"
        stroke="#f3c7a4"
        strokeWidth="8.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle cx="167" cy="196" r="6" fill="#f3c7a4" />

      {/* head hair */}
      <path
        d="M120 26 C 90 26 82 52 84 78 C 86 98 100 106 120 106 C 140 106 154 98 156 78 C 158 52 150 26 120 26 Z"
        fill={`url(#${hair})`}
      />
      <path
        d="M120 30 C 104 40 100 70 108 100"
        fill="none"
        stroke="#fff6d6"
        strokeOpacity="0.7"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* blowing strands */}
      <g className="tg-char-strands">
        <path d="M152 56 C 176 52 190 70 210 64" fill="none" stroke="#ffd37a" strokeWidth="3" strokeLinecap="round" opacity="0.9" />
        <path d="M153 72 C 172 74 184 88 202 86" fill="none" stroke="#ffe3a0" strokeWidth="2.4" strokeLinecap="round" opacity="0.8" />
      </g>
      {/* flower crown */}
      {[
        [96, 44],
        [112, 33],
        [130, 32],
        [145, 44],
      ].map(([x, y]) => (
        <g key={`c-${x}`}>
          <circle cx={x} cy={y} r="4.4" fill="#fff" />
          <circle cx={x} cy={y} r="1.9" fill="#ffb445" />
        </g>
      ))}
    </svg>
  );
}
