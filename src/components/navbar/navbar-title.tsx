'use client';
import { links } from '@/lib/links';
import { usePathname } from 'next/navigation';
import React from 'react';

const Title = () => {
  const curr_pathname = usePathname();
  const title = links.find((link) => curr_pathname.includes(link.to))?.title;
  const cuurent_date = new Date().toDateString();
  return (
    <div className="flex flex-col">
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-muted-foreground">{cuurent_date}</p>
    </div>
  );
};

export default Title;
