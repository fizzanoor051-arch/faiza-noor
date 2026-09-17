
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

  const [chatVertical, setChatVertical] = useState<
    "top" | "bottom"
  >("top");

  /* =========================================================
     CHAT RESIZE
     ========================================================= */

  const [chatWidth, setChatWidth] = useState(340);
  const [chatHeight, setChatHeight] = useState(520);

  const increaseChatSize = () => {
    setChatWidth((value) => Math.min(value + 40, 520));
    setChatHeight((value) => Math.min(value + 40, 700));
  };

  const decreaseChatSize = () => {
    setChatWidth((value) => Math.max(value - 40, 260));
    setChatHeight((value) => Math.max(value - 40, 360));
  };

  const dragRef = useRef({
    offsetX: 0,
    offsetY: 0,
  });

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

    updateChatDirection(
      x,
      y,
      rect.width,
      rect.height
    );
  };

  const toggleAI = () => {
    setOpen((value) => !value);
  };

  /*
   * Direct close function for the AIChat cross button.
   * This closes the chat immediately.
   */
  const handleChatClose = () => {
    setOpen(false);
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
             */
            width: `min(${chatWidth}px, 76vw)`,
            maxWidth: `${chatWidth}px`,
            height: `min(${chatHeight}px, 68vh)`,
            maxHeight: `min(${chatHeight}px, 68vh)`,

            /*
             * Keep chat directly attached
             * to the AI Orb.
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
        >
          {/* =====================================================
              CHAT RESIZE CONTROLS
              ===================================================== */}

          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <button
              type="button"
              onClick={decreaseChatSize}
              aria-label="Make chat smaller"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(20,20,20,0.75)",
                color: "#F4F0E6",
                fontSize: "20px",
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
            >
              −
            </button>

            <button
              type="button"
              onClick={increaseChatSize}
              aria-label="Make chat larger"
              style={{
                width: "28px",
                height: "28px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(20,20,20,0.75)",
                color: "#F4F0E6",
                fontSize: "20px",
                lineHeight: "1",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backdropFilter: "blur(8px)",
              }}
            >
              +
            </button>
          </div>

          {/* Cross button inside AIChat closes this box */}
          <AIChat onClose={handleChatClose} />
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

