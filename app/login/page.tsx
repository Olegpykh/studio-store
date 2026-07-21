'use client';

import { useState } from 'react';
import { loginAction } from '@/lib/actions/auth';
import { ArrowUpRight } from 'lucide-react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { AuthField } from '@/components/auth/AuthField';
import { AuthFooterLink } from '@/components/auth/AuthFooterLink';

export default function LoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    if (result?.error) {
      setError(result.error);
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      badge="Access Gateway"
      titleLine1="My"
      titleLine2="Account."
      description="Sign in to manage your curated orders, track high-performance technical apparel shipments, and update your active profile settings."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && (
          <div className="border border-border/80 p-4 text-[10px] font-mono tracking-widest uppercase text-foreground bg-zinc-50 dark:bg-zinc-900/50">
            Error // {error}
          </div>
        )}

        <div className="space-y-5">
          <AuthField
            id="email"
            name="email"
            type="email"
            label="Email Address"
            placeholder="ENTER YOUR EMAIL"
            required
          />
          <AuthField
            id="password"
            name="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            required
          />
        </div>

        <div className="flex flex-col gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="group flex items-center justify-between rounded-none bg-foreground text-background px-6 py-4 text-[11px] font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-[0.99] transition-all tracking-[0.2em] uppercase cursor-pointer"
          >
            {loading ? 'Processing' : 'Sign In'}
            <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </form>

      <AuthFooterLink
        question="No account yet?"
        linkLabel="Create One"
        href="/register"
      />
    </AuthLayout>
  );
}
