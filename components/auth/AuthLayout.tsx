interface AuthLayoutProps {
  badge: string;
  titleLine1: string;
  titleLine2: string;
  description: string;
  children: React.ReactNode;
}

export function AuthLayout({
  badge,
  titleLine1,
  titleLine2,
  description,
  children,
}: AuthLayoutProps) {
  return (
    <section className="mx-auto max-w-7xl px-4 pt-12 pb-32 sm:px-6 lg:px-8 relative min-h-[calc(100vh-80px)] flex items-center justify-center">
      <div className="absolute top-1/4 left-1/3 w-[450px] h-[450px] bg-zinc-200/40 dark:bg-zinc-800/10 rounded-full blur-[160px] pointer-events-none transition-colors duration-300" />

      <div className="relative w-full max-w-4xl py-12 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:40px_40px] text-zinc-950/[0.02] dark:text-white/[0.015] pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-6 space-y-8">
            <div className="inline-flex items-center gap-3">
              <span className="w-1.5 h-1.5 bg-foreground rounded-none animate-pulse" />
              <span className="text-[10px] font-bold text-foreground tracking-[0.3em] uppercase font-mono">
                {badge}
              </span>
            </div>

            <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl xl:text-7xl leading-[0.9] uppercase flex flex-col">
              <span>{titleLine1}</span>
              <span className="text-transparent [text-stroke:1.5px_var(--foreground)] sm:[text-stroke:2px_var(--foreground)] [-webkit-text-stroke:1.5px_var(--foreground)] sm:[-webkit-text-stroke:2px_var(--foreground)]">
                {titleLine2}
              </span>
            </h1>

            <p className="text-xs text-gray-500 dark:text-zinc-400 leading-relaxed font-light tracking-wide normal-case max-w-sm">
              {description}
            </p>
          </div>

          <div className="lg:col-span-6 space-y-8 border-l border-border/80 pl-6 lg:pl-10 w-full">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
