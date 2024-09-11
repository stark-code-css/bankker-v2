'use client';
import { IoLogOut } from 'react-icons/io5';
import UserSection from './user-section';
import LinkSection from './link-section';
import { Separator } from '@/components/ui/separator';
import { signOut } from 'next-auth/react';
import { MdMenuBook } from 'react-icons/md';

const Sidebar = () => {
  return (
    <div className="flex flex-col min-h-screen h-full bg-white p-4 md:p-8">
      <div className="mb-10">
        <UserSection />
      </div>
      <div className="grow mb-4">
        <LinkSection />
      </div>
      <div className="space-y-4">
        <Separator />
        <a
          href="https://pnbpassbook.vercel.app/"
          target="_blank"
          className="w-full h-16 flex items-center justify-center px-6 py-4 rounded-lg space-x-3 hover:bg-myPrimary/40 md:justify-start cursor-pointer">
          <span>
            <MdMenuBook size={24} />
          </span>
          <span className="hidden md:block">Passbook</span>
        </a>
        <button
          className="w-full h-16 flex items-center justify-center px-6 py-4 rounded-lg space-x-3 hover:bg-myPrimary/40 md:justify-start"
          onClick={() => {
            signOut();
          }}>
          <span>
            <IoLogOut size={24} />
          </span>
          <span className="hidden md:block">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
