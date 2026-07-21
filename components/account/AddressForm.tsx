'use client';

import { useActionState } from 'react';
import { Loader2 } from 'lucide-react';

export interface AddressFormValues {
  firstName?: string;
  lastName?: string;
  address1?: string;
  address2?: string;
  city?: string;
  zip?: string;
  country?: string;
  phone?: string;
}

interface AddressFormProps {
  action: (
    prevState: { error: string | null },
    formData: FormData
  ) => Promise<{ error: string | null }>;
  defaultValues?: AddressFormValues;
  submitLabel: string;
}

const initialState = { error: null };

export function AddressForm({
  action,
  defaultValues,
  submitLabel,
}: AddressFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
            First Name
          </label>
          <input
            name="firstName"
            required
            defaultValue={defaultValues?.firstName}
            className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
            Last Name
          </label>
          <input
            name="lastName"
            required
            defaultValue={defaultValues?.lastName}
            className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
          Address Line 1
        </label>
        <input
          name="address1"
          required
          defaultValue={defaultValues?.address1}
          className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
        />
      </div>

      <div className="space-y-2">
        <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
          Address Line 2 (optional)
        </label>
        <input
          name="address2"
          defaultValue={defaultValues?.address2}
          className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
            City
          </label>
          <input
            name="city"
            required
            defaultValue={defaultValues?.city}
            className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
            ZIP Code
          </label>
          <input
            name="zip"
            required
            defaultValue={defaultValues?.zip}
            className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
            Country
          </label>
          <input
            name="country"
            required
            placeholder="Germany"
            defaultValue={defaultValues?.country}
            className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
          />
        </div>
        <div className="space-y-2">
          <label className="text-[9px] font-bold tracking-widest uppercase text-gray-400 dark:text-zinc-500 font-mono block">
            Phone (optional)
          </label>
          <input
            name="phone"
            defaultValue={defaultValues?.phone}
            className="w-full border border-border bg-background px-3 py-2.5 text-xs font-mono text-foreground focus:outline-none focus:border-foreground"
          />
        </div>
      </div>

      {state.error && (
        <p className="text-[10px] font-bold text-rose-500 font-mono">
          {state.error}
        </p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-foreground text-background py-3.5 text-xs font-bold tracking-widest uppercase hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 font-mono cursor-pointer"
      >
        {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : submitLabel}
      </button>
    </form>
  );
}
