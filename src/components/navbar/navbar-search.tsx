'use client';
import { Search } from 'lucide-react';
import React from 'react';
import { Input } from '../ui/input';

const NavbarSearch = () => {
  return (
    <div
      className="bg-myGray rounded-full flex items-center gap-2 px-4 py-2"
      onClick={() => {
        document.getElementById('search')?.focus();
      }}>
      <Search />
      <Input placeholder="Search" id="search" className="border-none text-md" />
    </div>
  );
};

export default NavbarSearch;
