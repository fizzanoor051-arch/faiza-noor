"use client";

import { useState } from "react";

type AIVoiceProps = {
  onDemoMessage?: (message: string) => void;
};

export function AIVoice({
  onDemoMessage,
}: AIVoiceProps) {
  const [listening, setListening] =
    useState(false);

  const handleClick = () => {
    setListening(true);

    window.setTimeout(() => {
      setListening(false);

      onDemoMessage?.(
        "I'd like to know more about Faiza."
      );
    }, 1400);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`ai-voice-button ${
        listening ? "is-listening" : ""
      }`}
    >
      <span className="ai-voice-icon">
        {listening ? "◉" : "◌"}
      </span>

      <span className="ai-voice-copy">
        <strong>
          {listening
            ? "LISTENING..."
            : "TALK TO AI"}
        </strong>

        <small>
          {listening
            ? "Speak naturally"
            : "Voice interface"}
        </small>
      </span>

      <span className="ai-voice-wave">
        <i />
        <i />
        <i />
        <i />
        <i />
      </span>
    </button>
  );
}