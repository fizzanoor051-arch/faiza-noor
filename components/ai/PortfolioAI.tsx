
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

  const [chatSide, setChatSide] = useState<
    "left" | "right"
  >("left");

  // ADDED: vertical direction for chat
  const [chatVertical, setChatVertical] = useState<
    "top" | "bottom"
  >("top");

  const dragRef = useRef({
    offsetX: 0,
    offsetY: 0,
  });

  const handleDragStart = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    const rect =
      event.currentTarget.getBoundingClientRect();

    dragRef.current.offsetX =
      event.clientX - rect.left;

    dragRef.current.offsetY =
      event.clientY - rect.top;

    setDragPosition({
      x: rect.left,
      y: rect.top,
    });

    // ADDED: calculate chat direction
    updateChatDirection(
      rect.left,
      rect.top,
      rect.width,
      rect.height
    );
  };

  const handleDragMove = (
    event: React.PointerEvent<HTMLDivElement>
  ) => {
    if (event.buttons !== 1) return;

    const element = event.currentTarget;
    const rect = element.getBoundingClientRect();

    let x =
      event.clientX -
      dragRef.current.offsetX;

    let y =
      event.clientY -
      dragRef.current.offsetY;

    x = Math.max(
      0,
      Math.min(
        x,
        window.innerWidth - rect.width
      )
    );

    y = Math.max(
      0,
      Math.min(
        y,
        window.innerHeight - rect.height
      )
    );

    setDragPosition({ x, y });

    // ADDED: update chat direction while dragging
    updateChatDirection(
      x,
      y,
      rect.width,
      rect.height
    );
  };

  // ADDED: determine opposite corner
  const updateChatDirection = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => {
    const centerX = x + width / 2;
    const centerY = y + height / 2;

    const isLeft =
      centerX < window.innerWidth / 2;

    const isTop =
      centerY < window.innerHeight / 2;

    /*
     * AI bottom-right  → Chat top-left
     * AI bottom-left   → Chat top-right
     * AI top-right     → Chat bottom-left
     * AI top-left      → Chat bottom-right
     */

    if (isTop) {
      setChatVertical("bottom");
    } else {
      setChatVertical("top");
    }

    if (isLeft) {
      setChatSide("right");
    } else {
      setChatSide("left");
    }
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
          className={`portfolio-ai-window ${
            chatSide === "left"
              ? "chat-side-left"
              : "chat-side-right"
          } ${
            chatVertical === "top"
              ? "chat-side-top"
              : "chat-side-bottom"
          }`}
          style={{
            /*
             * CHAT SIZE
             * Smaller than the previous version.
             */
            width: "min(340px, 76vw)",
            maxWidth: "340px",
            maxHeight: "min(520px, 68vh)",

            /*
             * Keep chat attached very close to AI Orb.
             * No large gap / separate floating position.
             */
            ...(chatSide === "left"
              ? {
                  right: "calc(100% + 6px)",
                  left: "auto",
                }
              : {
                  left: "calc(100% + 6px)",
                  right: "auto",
                }),

            ...(chatVertical === "top"
              ? {
                  bottom: "calc(100% + 6px)",
                  top: "auto",
                }
              : {
                  top: "calc(100% + 6px)",
                  bottom: "auto",
                }),
          }}
          onMouseEnter={clearCloseTimer}
          onMouseLeave={closeAI}
        >
          <AIChat />
        </div>
      )}

      {/* AI BUTTON */}
      <div
        className="portfolio-ai-trigger"
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
