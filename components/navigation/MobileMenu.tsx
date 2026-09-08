
"use client";

type NavItem = {
  label: string;
  href: string;
};

type MobileMenuProps = {
  open: boolean;
  items: NavItem[];
  onClose: () => void;
  onCommand: () => void;
};

export default function MobileMenu({
  open,
  items,
  onClose,
  onCommand,
}: MobileMenuProps) {
  return (
    <div
      className={`overflow-hidden border-t border-white/10 bg-[#05050a]/95 backdrop-blur-2xl transition-all duration-500 lg:hidden ${
        open
          ? "max-h-[520px] opacity-100"
          : "pointer-events-none max-h-0 opacity-0"
      }`}
    >
      <nav className="mx-auto max-w-7xl px-5 py-6 sm:px-8" aria-label="Mobile navigation">
        <div className="space-y-1">
          {items.map((item, index) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="group flex items-center justify-between rounded-2xl border border-transparent px-4 py-4 transition-all duration-300 hover:border-white/10 hover:bg-white/[0.04]"
              style={{
                transitionDelay: open ? `${index * 35}ms` : "0ms",
              }}
            >
              <span className="flex items-center gap-4">
                <span className="font-mono text-[9px] text-white/20">
                  0{index + 1}
                </span>

                <span className="text-sm font-medium text-white/65 transition-colors group-hover:text-white">
                  {item.label}
                </span>
              </span>

              <span className="text-white/20 transition-all duration-300 group-hover:translate-x-1 group-hover:text-violet-300">
                →
              </span>
            </a>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onCommand}
            className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-left transition-all hover:bg-white/[0.06]"
          >
            <span className="block text-[9px] uppercase tracking-[0.2em] text-white/30">
              Command
            </span>
            <span className="mt-1 block text-xs text-white/70">
              ⌘ K
            </span>
          </button>

          <a
            href="#contact"
            onClick={onClose}
            className="rounded-2xl border border-violet-400/20 bg-violet-500/10 px-4 py-3 text-left transition-all hover:bg-violet-500/15"
          >
            <span className="block text-[9px] uppercase tracking-[0.2em] text-violet-200/50">
              Available
            </span>
            <span className="mt-1 block text-xs text-violet-100">
              Hire Me →
            </span>
          </a>
        </div>
      </nav>
    </div>
  );
}
