'use server';

import prisma from '@/lib/db';
import { hashPassword } from '@/lib/hashPassword';
import { users_role } from '@prisma/client'; // Import the users_role enum

export async function userAddAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as users_role;

  const res = await prisma.users.create({
    data: {
      name,
      email,
      password: await hashPassword(password),
      role,
    },
  });
}

export async function userUpdateAction(formData: FormData) {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const role = formData.get('role') as users_role;

  const res = await prisma.users.update({
    where: {
      email,
    },
    data: {
      name,
      email,
      password: await hashPassword(password),
      role,
    },
  });
}
