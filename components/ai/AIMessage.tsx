type AIMessageProps = {
  role: "user" | "assistant";
  content: string;
};

export function AIMessage({
  role,
  content,
}: AIMessageProps) {
  const assistant = role === "assistant";

  return (
    <div
      className={`ai-message ${
        assistant
          ? "ai-message--assistant"
          : "ai-message--user"
      }`}
    >
      {assistant && (
        <div className="ai-message-avatar">
          FN
        </div>
      )}

      <div className="ai-message-body">
        <span className="ai-message-label">
          {assistant ? "FAIZA AI" : "YOU"}
        </span>

        <div className="ai-message-bubble">
          {content}
        </div>
      </div>
    </div>
  );
}