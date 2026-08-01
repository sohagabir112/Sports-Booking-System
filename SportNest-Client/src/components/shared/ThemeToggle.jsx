'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 animate-pulse border border-slate-200 dark:border-slate-700" />
    );
  }

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className="relative p-2.5 rounded-full bg-slate-100 dark:bg-slate-800/90 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-[#24B1B1] dark:hover:border-[#24B1B1] transition-all duration-300 shadow-xs focus:outline-hidden focus:ring-2 focus:ring-[#24B1B1]/40 flex items-center justify-center group cursor-pointer"
    >
      {isDark ? (
        <FiSun className="w-5 h-5 text-amber-400 group-hover:rotate-45 transition-transform duration-300" />
      ) : (
        <FiMoon className="w-5 h-5 text-slate-700 group-hover:-rotate-12 transition-transform duration-300" />
      )}
    </button>
  );
}
