
"use client";

import { useEffect, useRef, useState } from "react";

type NavItem = {
  label: string;
  href: string;
};

type CommandMenuProps = {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
};

const extraCommands = [
  {
    label: "Resume",
    href: "/resume",
    description: "View my professional resume",
  },
  {
    label: "Contact",
    href: "#contact",
    description: "Start a project conversation",
  },
];

export default function CommandMenu({
  open,
  items,
  onClose,
}: CommandMenuProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = [
    ...items.map((item) => ({
      ...item,
      description: `Navigate to ${item.label.toLowerCase()}`,
    })),
    ...extraCommands,
  ];

  const filteredCommands = commands.filter((command) =>
    `${command.label} ${command.description}`
      .toLowerCase()
      .includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }

    const timer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 80);

    return () => window.clearTimeout(timer);
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const navigate = (href: string) => {
    onClose();

    if (href.startsWith("#")) {
      window.setTimeout(() => {
        document.querySelector(href)?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 50);
    } else {
      window.location.href = href;
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center bg-black/70 px-4 pt-[12vh] backdrop-blur-md"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Command menu"
    >
      <div className="w-full max-w-xl overflow-hidden rounded-3xl border border-white/10 bg-[#09090f]/95 shadow-2xl shadow-black/50">
        {/* Header */}
        <div className="border-b border-white/10 p-4">
          <div className="flex items-center gap-3">
            <span className="font-mono text-sm text-violet-300">⌘</span>

            <input
              ref={inputRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search portfolio..."
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/25"
              aria-label="Search portfolio"
            />

            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/10 px-2 py-1 font-mono text-[10px] text-white/35 transition-colors hover:text-white"
            >
              ESC
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[55vh] overflow-y-auto p-2">
          {filteredCommands.length > 0 ? (
            filteredCommands.map((command, index) => (
              <button
                key={`${command.href}-${command.label}`}
                type="button"
                onClick={() => navigate(command.href)}
                className="group flex w-full items-center gap-4 rounded-2xl px-4 py-4 text-left transition-all duration-200 hover:bg-white/[0.05]"
              >
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] font-mono text-xs text-white/30 transition-colors group-hover:border-violet-400/30 group-hover:text-violet-300">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-white/75 group-hover:text-white">
                    {command.label}
                  </span>
                  <span className="mt-1 block truncate text-[11px] text-white/25">
                    {command.description}
                  </span>
                </span>

                <span className="text-white/20 transition-transform group-hover:translate-x-1 group-hover:text-violet-300">
                  →
                </span>
              </button>
            ))
          ) : (
            <div className="px-4 py-10 text-center">
              <p className="text-sm text-white/40">No results found.</p>
              <p className="mt-1 text-[11px] text-white/20">
                Try another search term.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-white/10 px-4 py-3">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/20">
            FAIZA.NOOR / COMMAND CENTER
          </span>

          <span className="text-[9px] text-white/20">
            Navigate with mouse
          </span>
        </div>
      </div>
    </div>
  );
}
