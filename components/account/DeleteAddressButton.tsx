'use client';

import { useTransition } from 'react';
import { Loader2, Trash2 } from 'lucide-react';

interface DeleteAddressButtonProps {
  action: () => Promise<void>;
}

export function DeleteAddressButton({ action }: DeleteAddressButtonProps) {
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
    if (!window.confirm('Delete this address? This cannot be undone.')) {
      return;
    }
    startTransition(() => {
      action();
    });
  };

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="text-[9px] font-bold tracking-[0.15em] text-rose-500 uppercase hover:underline font-mono inline-flex items-center gap-1 disabled:opacity-50 cursor-pointer"
    >
      {isPending ? (
        <Loader2 className="w-3.5 h-3.5 animate-spin" />
      ) : (
        <>
          <Trash2 className="w-3.5 h-3.5" />
          Delete
        </>
      )}
    </button>
  );
}
