"use client";

const contactItems = [
  {
    label: "EMAIL",
    value: "Let’s connect through the form",
    icon: "@",
    
  },
  {
    label: "GITHUB",
    value: "github.com/fizzanoor",
    icon: "⌘",
    href: "https://github.com/fizzanoor051-arch",
  },
  {
    label: "LINKEDIN",
    value: "Professional network",
    icon: "in",
    href: "https://www.linkedin.com/in/faiza-noor-b2711b42b",
  },
];

export default function ContactTerminal() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.025] backdrop-blur-xl">
      {/* Terminal header */}
      <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/60" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/60" />
        </div>

        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/25">
          contact_terminal
        </span>
      </div>

      <div className="p-6 sm:p-8">
        {/* Terminal intro */}
        <div className="font-mono text-xs leading-7">
          <p className="text-purple-300/70">
            $ initialize_contact()
          </p>

          <p className="mt-2 text-white/30">
            Loading communication channels...
          </p>

          <p className="text-emerald-300/60">
            ✓ connection ready
          </p>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-white/10" />

        {/* Contact items */}
        <div className="space-y-3">
          {contactItems.map((item) => {
            const content = (
              <>
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] font-mono text-xs text-purple-200/70">
                  {item.icon}
                </span>

                <span className="min-w-0">
                  <span className="block text-[9px] uppercase tracking-[0.25em] text-white/25">
                    {item.label}
                  </span>

                  <span className="mt-1 block truncate text-sm text-white/55">
                    {item.value}
                  </span>
                </span>

                {item.href && (
                  <span className="ml-auto text-white/20 transition group-hover:translate-x-1 group-hover:text-purple-300">
                    ↗
                  </span>
                )}
              </>
            );

            if (item.href) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4 transition hover:border-purple-300/20 hover:bg-purple-400/[0.04]"
                >
                  {content}
                </a>
              );
            }

            return (
              <div
                key={item.label}
                className="flex items-center gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4"
              >
                {content}
              </div>
            );
          })}
        </div>

        {/* Philosophy */}
        <div className="mt-8 rounded-2xl border border-purple-400/10 bg-purple-400/[0.03] p-5">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-purple-300/50">
            Engineering principle
          </p>

          <p className="mt-3 text-sm leading-6 text-white/40">
            Clear communication, thoughtful architecture, and purposeful
            implementation come before unnecessary complexity.
          </p>
        </div>
      </div>
    </div>
  );
}