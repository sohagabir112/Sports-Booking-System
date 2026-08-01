'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Navlink = ({ href, children }) => {
  const path = usePathname();
  const isActive = path === href;
  return (
    <div>
      <Link
        href={href}
        className={`transition-colors duration-200 hover:text-[#24B1B1] dark:hover:text-[#24B1B1] ${
          isActive
            ? "text-[#24B1B1] dark:text-[#24B1B1] font-semibold border-b-2 border-[#24B1B1] px-2 py-1"
            : "text-slate-800 dark:text-slate-200"
        }`}
      >
        {children}
      </Link>
    </div>
  );
};

export default Navlink;