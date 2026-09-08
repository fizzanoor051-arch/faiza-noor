"use client";

type AIOrbProps = {
  isOpen: boolean;
  isSpeaking: boolean;
  isThinking: boolean;
  onClick: () => void;
};

export function AIOrb({
  isOpen,
  isSpeaking,
  isThinking,
  onClick,
}: AIOrbProps) {
  return (
    <button
      type="button"
      className={`ai-core ${
        isOpen ? "ai-core--open" : ""
      } ${
        isSpeaking ? "ai-core--speaking" : ""
      } ${
        isThinking ? "ai-core--thinking" : ""
      }`}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      aria-label={isOpen ? "Close Faiza AI" : "Open Faiza AI"}
      aria-expanded={isOpen}
    >
      <span className="ai-core-atmosphere" />

      <span className="ai-core-orbit ai-core-orbit--one" />
      <span className="ai-core-orbit ai-core-orbit--two" />

      <span className="ai-signal ai-signal--one" />
      <span className="ai-signal ai-signal--two" />
      <span className="ai-signal ai-signal--three" />

      <span className="ai-core-body">
        <span className="ai-core-glass" />
        <span className="ai-core-light" />

        <span className="ai-core-symbol">
          <span />
          <span />
          <span />
        </span>
      </span>

      <span className="ai-core-status">
        <span className="ai-core-status-dot" />

        {isSpeaking
          ? "VOICE"
          : isThinking
            ? "THINKING"
            : isOpen
              ? "ONLINE"
              : "AI"}
      </span>
    </button>
  );
}