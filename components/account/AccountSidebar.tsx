// components/account/AccountSidebar.tsx
import { logoutAction } from '@/lib/actions/auth';
import { ArrowUpRight, Shield, LogOut } from 'lucide-react';

interface AccountSidebarProps {
  firstName: string;
  email: string;
  tier: string;
  memberSince: string;
  spentThisYear: string;
}

export function AccountSidebar({
  firstName,
  email,
  tier,
  memberSince,
  spentThisYear,
}: AccountSidebarProps) {
  return (
    <div className="lg:col-span-4 space-y-8">
      <div className="inline-flex items-center gap-3">
        <span className="w-1.5 h-1.5 bg-green-500 rounded-none animate-pulse" />
        <span className="text-[10px] font-bold text-foreground tracking-[0.3em] uppercase font-mono">
          System Active // Server Auth
        </span>
      </div>

      <h1 className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl leading-[0.9] uppercase flex flex-col">
        <span>{firstName || 'Client'}</span>
        <span className="text-transparent [text-stroke:1.5px_var(--foreground)] [-webkit-text-stroke:1.5px_var(--foreground)]">
          Hub.
        </span>
      </h1>

      <div className="border border-border/85 bg-background/50 backdrop-blur-md p-6 space-y-6">
        <div className="border-b border-border/40 pb-4">
          <p className="text-[9px] font-bold tracking-[0.25em] text-gray-400 dark:text-zinc-500 font-mono uppercase">
            User Identification
          </p>
          <p className="text-xs font-bold text-foreground mt-2 tracking-wide font-mono break-all">
            {email}
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 dark:text-zinc-500 font-light">
              Clearance Rank:
            </span>
            <span className="font-mono font-bold text-foreground flex items-center gap-1.5 uppercase tracking-wider text-[10px]">
              <Shield className="w-3 h-3 text-foreground" />
              {tier}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 dark:text-zinc-500 font-light">
              Established:
            </span>
            <span className="font-mono text-foreground font-bold">
              {memberSince}
            </span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-gray-400 dark:text-zinc-500 font-light">
              2026 Volume:
            </span>
            <span className="font-mono text-foreground font-bold">
              {spentThisYear}
            </span>
          </div>
        </div>

        <form action={logoutAction} className="pt-2">
          <button
            type="submit"
            className="group w-full flex items-center justify-between rounded-none bg-transparent border border-border px-4 py-3 text-[10px] font-bold text-foreground hover:bg-foreground hover:text-background active:scale-[0.99] transition-all tracking-[0.2em] uppercase cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <LogOut className="w-3.5 h-3.5" />
              Terminate Session
            </span>
            <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </form>
      </div>
    </div>
  );
}
