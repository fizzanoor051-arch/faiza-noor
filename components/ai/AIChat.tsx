
"use client";

import {
  FormEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { AIMessage } from "./AIMessage";
import { AIQuickActions } from "./AIQuickActions";
import { AIVoice } from "./AIVoice";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

type AIChatProps = {
  onClose: () => void;
};

export function AIChat({ onClose }: AIChatProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content:
        "Welcome to Faiza's portfolio. 👋 I'm Faiza AI — your intelligent portfolio assistant. Ask me anything about Faiza, her projects, skills or services.",
    },
  ]);

  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, thinking]);

  const sendMessage = async (text: string) => {
    const cleanText = text.trim();

    if (!cleanText || thinking) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: cleanText,
    };

    const updatedMessages = [
      ...messages,
      userMessage,
    ];

    setMessages(updatedMessages);
    setInput("");
    setThinking(true);

    try {
      /*
       * Send the complete recent conversation to the
       * AI backend so the assistant understands context
       * and follow-up questions.
       */
      const response = await fetch("/api/ai", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: updatedMessages.map(
            (message) => ({
              role: message.role,
              content: message.content,
            })
          ),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.error ||
            "Something went wrong with the AI."
        );
      }

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content:
          data?.message ||
          "I'm sorry, I couldn't generate a response right now.",
      };

      setMessages((current) => [
        ...current,
        assistantMessage,
      ]);
    } catch (error) {
      console.error("AI chat error:", error);

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "I'm having trouble connecting to my AI brain right now. Please try again in a moment. 🤍",
        },
      ]);
    } finally {
      setThinking(false);
    }
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    sendMessage(input);
  };

  return (
    <div
      className="ai-chat"
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
      }}
    >
      {/* HEADER */}

      <header
        className="ai-chat-header"
        style={{
          position: "relative",
        }}
      >
        <div className="ai-chat-identity">
          <div className="ai-chat-avatar">
            FN

            <span />
          </div>

          <div>
            <strong>FAIZA AI</strong>

            <small>
              Intelligent Portfolio Assistant
            </small>
          </div>
        </div>

        <div className="ai-chat-header-actions">
          <div className="ai-online">
            <span />
            ONLINE
          </div>
        </div>

        {/* CLOSE BUTTON BOX */}
            
        
<button
  type="button"
  onClick={onClose}
  aria-label="Close Faiza AI"
  title="Close Faiza AI"
  className="ai-chat-close"
  style={{
    position: "absolute",
    top: "8px",
    left: "8px",
    right: "auto",
    zIndex: 9999,

    width: "36px",
    height: "36px",
    minWidth: "36px",
    minHeight: "36px",

    padding: 0,
    margin: 0,

    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    borderRadius: "9px",
    border: "1px solid rgba(255,255,255,0.18)",

    background: "rgba(255,255,255,0.09)",

    color: "#ffffff",

    fontSize: "25px",
    fontWeight: "300",
    lineHeight: "1",

    cursor: "pointer",

    boxShadow:
      "0 4px 15px rgba(0,0,0,0.25)",

    backdropFilter: "blur(8px)",

    visibility: "visible",
    opacity: 1,
  }}
>
  ×
</button>


      
              
      </header>

      {/* CHAT AREA */}

      <div className="ai-chat-messages">
        {messages.map((message) => (
          <AIMessage
            key={message.id}
            role={message.role}
            content={message.content}
          />
        ))}

        {messages.length === 1 && (
          <AIQuickActions
            onSelect={sendMessage}
          />
        )}

        {thinking && (
          <div className="ai-thinking">
            <div className="ai-message-avatar">
              FN
            </div>

            <div className="ai-thinking-content">
              <span>FAIZA AI</span>

              <div className="ai-thinking-dots">
                <i />
                <i />
                <i />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* COMPOSER */}

      <div className="ai-composer">
        <AIVoice
          onDemoMessage={sendMessage}
        />

        <form
          onSubmit={handleSubmit}
          className="ai-input-row"
        >
          <input
            type="text"
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            placeholder="Ask me about Faiza..."
            disabled={thinking}
          />

          <button
            type="submit"
            disabled={
              thinking || !input.trim()
            }
            aria-label="Send message"
          >
            ↗
          </button>
        </form>

        <div className="ai-composer-meta">
          <span>FAIZA AI</span>

          <span>
            AI ASSISTANT • V1.0
          </span>
        </div>
      </div>
    </div>
  );
}

