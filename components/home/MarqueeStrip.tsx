const ITEMS = [
  'Curated Style',
  'Urban Motion',
  'Est. 2026',
  'Fixed Gear',
  'Technical Apparel',
  'Winter Equipment',
];

export function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS];

  return (
    <div className="border-y border-border bg-zinc-50/50 dark:bg-zinc-900/20 py-4 overflow-hidden transition-colors duration-300">
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((item, idx) => (
          <span
            key={idx}
            className="mx-8 text-xs font-bold font-mono uppercase tracking-[0.2em] text-gray-400 dark:text-zinc-500 flex items-center gap-8"
          >
            {item}
            <span className="text-gray-300 dark:text-zinc-700">/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
