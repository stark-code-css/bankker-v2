import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Bankker v2',
  description: 'Advanced CSP Management App',
};

const inter = Inter({ subsets: ['latin'] });

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen`}>
        <SessionProvider session={session}>
          <div>{children}</div>
        </SessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
