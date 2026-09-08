"use client";

const quickActions = [
  {
    label: "Tell me about Faiza",
    icon: "01",
  },
  {
    label: "Show me her projects",
    icon: "02",
  },
  {
    label: "What are her skills?",
    icon: "03",
  },
  {
    label: "What can she build?",
    icon: "04",
  },
  {
    label: "Is she available for work?",
    icon: "05",
  },
];

type AIQuickActionsProps = {
  onSelect: (message: string) => void;
};

export function AIQuickActions({
  onSelect,
}: AIQuickActionsProps) {
  return (
    <div className="ai-quick-actions">
      <div className="ai-quick-heading">
        <span>QUICK ACCESS</span>

        <span>ASK AI</span>
      </div>

      {quickActions.map((action) => (
        <button
          key={action.label}
          type="button"
          className="ai-quick-action"
          onClick={() => onSelect(action.label)}
        >
          <span className="ai-quick-number">
            {action.icon}
          </span>

          <span className="ai-quick-label">
            {action.label}
          </span>

          <span className="ai-quick-arrow">
            ↗
          </span>
        </button>
      ))}
    </div>
  );
}