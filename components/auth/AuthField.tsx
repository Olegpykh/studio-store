interface AuthFieldProps {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required?: boolean;
}

export function AuthField({
  id,
  name,
  type,
  label,
  placeholder,
  required,
}: AuthFieldProps) {
  return (
    <div className="flex flex-col">
      <label className="text-[9px] font-bold tracking-[0.25em] uppercase text-gray-400 dark:text-zinc-500 mb-1.5 font-mono">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        className="w-full bg-transparent border-b border-border/80 py-2.5 text-xs tracking-widest text-foreground focus:border-foreground focus:outline-none transition-colors duration-300 rounded-none placeholder-zinc-300 dark:placeholder-zinc-700"
        placeholder={placeholder}
      />
    </div>
  );
}
