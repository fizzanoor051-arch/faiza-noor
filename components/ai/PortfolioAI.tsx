"use client";

import { useRef, useState } from "react";
import { AIChat } from "./AIChat";
import { AIOrb } from "./AIOrb";

export default function PortfolioAI() {
  const [open, setOpen] = useState(false);

  const [thinking] = useState(false);
  const [speaking] = useState(false);
  const [dragPosition, setDragPosition] = useState<{
  x: number;
  y: number;
} | null>(null);
const [chatSide, setChatSide] = useState<"left" | "right">("left");


const dragRef = useRef({
  offsetX: 0,
  offsetY: 0,
});

const handleDragStart = (
  event: React.PointerEvent<HTMLDivElement>
) => {
  const rect = event.currentTarget.getBoundingClientRect();

  dragRef.current.offsetX = event.clientX - rect.left;
  dragRef.current.offsetY = event.clientY - rect.top;

  setDragPosition({
    x: rect.left,
    y: rect.top,
  });
};

const handleDragMove = (
  event: React.PointerEvent<HTMLDivElement>
) => {
  if (event.buttons !== 1) return;

  const element = event.currentTarget;
  const rect = element.getBoundingClientRect();

  let x = event.clientX - dragRef.current.offsetX;
  let y = event.clientY - dragRef.current.offsetY;

  x = Math.max(0, Math.min(x, window.innerWidth - rect.width));
  y = Math.max(0, Math.min(y, window.innerHeight - rect.height));

  setDragPosition({ x, y });
};

  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(
    null
  );

  const clearCloseTimer = () => {
    if (closeTimer.current !== null) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const openAI = () => {
    clearCloseTimer();
    setOpen(true);
  };

  const closeAI = () => {
    clearCloseTimer();

    closeTimer.current = setTimeout(() => {
      setOpen(false);
    }, 250);
  };

  const toggleAI = () => {
    clearCloseTimer();
    setOpen((value) => !value);
  };

  return (
    <div
      className={`portfolio-ai-shell ${
        open ? "is-open" : ""
      }`}
      style={
  dragPosition
    ? {
        position: "fixed",
        left: `${dragPosition.x}px`,
        top: `${dragPosition.y}px`,
        right: "auto",
        bottom: "auto",
      }
    : undefined
}
      onMouseEnter={clearCloseTimer}
      onMouseLeave={closeAI}
    >
      {/* CHAT PANEL */}
      {open && (
        <div
          className="portfolio-ai-window"
          onMouseEnter={clearCloseTimer}
          onMouseLeave={closeAI}
        >
          <AIChat />
        </div>
      )}

      {/* AI BUTTON */}
      <div className="portfolio-ai-trigger" 
       onPointerDown={handleDragStart}
  onPointerMove={handleDragMove}
  style={{
    touchAction: "none",
    cursor: "grab",
  }}
      >
        <AIOrb
          isOpen={open}
          isThinking={thinking}
          isSpeaking={speaking}
          onClick={toggleAI}
        />
      </div>
    </div>
  );
}