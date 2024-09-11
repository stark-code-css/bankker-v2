import { auth } from '@/auth';
import prisma from '@/lib/db';
import { redirect } from 'next/navigation';
import React from 'react';
import AddUser from './add-user';
import ChangePassword from './change-password';

const Page = async () => {
  const session = await auth();
  if (!session || !session.user) {
    return redirect('/auth');
  }
  const user = session.user.email as string;
  const { role } = await prisma.users.findFirstOrThrow({
    where: {
      email: user,
    },
    select: {
      role: true,
    },
  });

  if (role !== 'admin') {
    return redirect('/auth');
  }

  return (
    <div className="p-8 flex flex-col justify-center items-center gap-4">
      <div className="flex flex-col items-center">
        <h1>Admin Page</h1>
        <p>Welcome, {session.user.name}</p>
      </div>
      <div className="flex gap-4">
        <AddUser />
        <ChangePassword />
      </div>
    </div>
  );
};

export default Page;
