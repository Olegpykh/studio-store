import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

interface AuthFooterLinkProps {
  question: string;
  linkLabel: string;
  href: string;
}

export function AuthFooterLink({
  question,
  linkLabel,
  href,
}: AuthFooterLinkProps) {
  return (
    <div className="pt-6 border-t border-border/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
      <span className="text-[9px] text-gray-400 dark:text-zinc-500 tracking-[0.2em] uppercase font-mono">
        {question}
      </span>
      <Link
        href={href}
        className="group inline-flex items-center gap-1 text-[10px] font-bold text-foreground tracking-[0.2em] uppercase hover:underline"
      >
        {linkLabel}
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
