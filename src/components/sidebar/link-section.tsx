'use client';
import { links } from '@/lib/links';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const LinkSection = () => {
  const currentPath = usePathname();

  return (
    <div className="w-full flex flex-col gap-4">
      {links.map(({ title, icon: Icon, to }) => {
        return (
          <Link
            className={`w-full h-16 flex items-center justify-center px-6 py-4 rounded-lg space-x-3 hover:bg-myPrimary/40 md:justify-start
              ${currentPath === to ? 'bg-myPrimary text-white' : ''}`}
            key={title}
            href={to}>
            <span>
              <Icon size={24} />
            </span>
            <span className="hidden md:block">{title}</span>
          </Link>
        );
      })}
    </div>
  );
};

export default LinkSection;
