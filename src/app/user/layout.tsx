import Navbar from '@/components/navbar/navbar';
import Sidebar from '@/components/sidebar/sidebar';
import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex bg-bgGray">
      <div className="w-1/5 md:w-[300px]">
        <Sidebar />
      </div>
      <div className="w-4/5">
        <div>
          <Navbar />
        </div>
        <div className="p-4 md:p-8">{children}</div>
      </div>
    </div>
  );
}
