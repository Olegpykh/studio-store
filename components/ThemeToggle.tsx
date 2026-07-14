'use client';

import { useState, useEffect } from 'react'; 
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) {
    return <div className="w-8 h-8" />; 
  }

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 text-gray-700 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-gray-50 dark:hover:bg-zinc-900 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 stroke-[1.5]" />
      ) : (
        <Moon className="w-4 h-4 stroke-[1.5]" />
      )}
    </button>
  );
}
