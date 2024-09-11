import { signIn } from 'next-auth/react';

export const authenticate = async (formData: FormData) => {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  await signIn('credentials', {
    email,
    password,
  });
};
