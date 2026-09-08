"use client";

interface SkillCategoryProps {
  categories: string[];
  activeCategory: string;
  onChange: (category: string) => void;
}

export default function SkillCategory({
  categories,
  activeCategory,
  onChange,
}: SkillCategoryProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`
              rounded-full
              border
              px-4
              py-2.5
              text-xs
              font-semibold
              uppercase
              tracking-[0.14em]
              transition-all
              duration-300
              ${
                isActive
                  ? "border-cyan-300/40 bg-cyan-300/10 text-cyan-200 shadow-[0_0_25px_rgba(34,211,238,0.10)]"
                  : "border-white/10 bg-white/[0.03] text-white/40 hover:border-white/20 hover:bg-white/[0.06] hover:text-white/80"
              }
            `}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}