import type { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-myPrimary/60 min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
