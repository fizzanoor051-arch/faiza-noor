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

const responses: Record<string, string> = {
  "Tell me about Faiza":
    "Absolutely! Faiza Noor is a Full Stack Web Engineer focused on creating modern, responsive and cinematic digital experiences. She works with React, Next.js, TypeScript, Node.js and modern web technologies.",

  "Show me her projects":
    "Of course! You can explore projects such as ShopSphere, a modern e-commerce experience, her hospital website project, and this cinematic portfolio. Want me to guide you to the Projects section?",

  "What are her skills?":
    "Faiza works across the full stack — React, Next.js, TypeScript, Tailwind CSS, Node.js, Express.js, MongoDB, PostgreSQL, REST APIs, authentication, Git, Docker and AI integration.",

  "What can she build?":
    "She can build modern business websites, e-commerce platforms, portfolios, dashboards, REST APIs, authentication systems and AI-powered web experiences.",

  "Is she available for work?":
    "Yes. Faiza is open to selected freelance projects and collaborations. If you'd like to work with her, the Contact section is the best place to start.",
};

export function AIChat() {
  const [messages, setMessages] =
    useState<Message[]>([
      {
        id: 1,
        role: "assistant",
        content:
          "Welcome to Faiza's portfolio. 👋 I'm Faiza AI — your intelligent portfolio assistant. Ask me anything about Faiza, her projects, skills or services.",
      },
    ]);

  const [input, setInput] = useState("");
  const [thinking, setThinking] =
    useState(false);

  const bottomRef =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages, thinking]);

  const sendMessage = (text: string) => {
    const cleanText = text.trim();

    if (!cleanText || thinking) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: cleanText,
    };

    setMessages((current) => [
      ...current,
      userMessage,
    ]);

    setInput("");
    setThinking(true);

    window.setTimeout(() => {
      const exactResponse =
        responses[cleanText];

      const response =
        exactResponse ||
        "That's a great question. I'm currently running in portfolio preview mode. Tomorrow, we'll connect me to the real AI backend so I can have a much deeper conversation with you.";

      setMessages((current) => [
        ...current,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: response,
        },
      ]);

      setThinking(false);
    }, 900);
  };

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    sendMessage(input);
  };

  return (
    <div className="ai-chat">
      {/* HEADER */}

      <header className="ai-chat-header">
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

        <div className="ai-online">
          <span />
          ONLINE
        </div>
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
          <span>
            FAIZA AI
          </span>

          <span>
            FRONTEND PREVIEW • V1.0
          </span>
        </div>
      </div>
    </div>
  );
}