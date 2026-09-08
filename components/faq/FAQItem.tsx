"use client";

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FAQItem({
  faq,
  isOpen,
  onToggle,
}: FAQItemProps) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border transition-all duration-300 ${
        isOpen
          ? "border-purple-400/25 bg-purple-500/[0.04]"
          : "border-white/8 bg-white/[0.018] hover:border-white/15"
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-5 px-5 py-5 text-left sm:px-7 sm:py-6"
      >
        {/* Number */}
        <span
          className={`font-mono text-xs ${
            isOpen ? "text-purple-300" : "text-white/20"
          }`}
        >
          {faq.id}
        </span>

        {/* Question */}
        <span className="flex-1 text-sm font-medium text-white/75 sm:text-base">
          {faq.question}
        </span>

        {/* Toggle */}
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
            isOpen
              ? "rotate-45 border-purple-300/30 bg-purple-400/10 text-purple-200"
              : "border-white/10 text-white/30"
          }`}
        >
          +
        </span>
      </button>

      {/* Answer */}
      <div
        className={`grid transition-all duration-400 ${
          isOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="border-t border-white/8 px-5 pb-6 pt-5 sm:px-7 sm:pl-[76px]">
            <p className="max-w-3xl text-sm leading-7 text-white/45">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}