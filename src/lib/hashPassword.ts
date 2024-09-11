import { genSalt, hash, compare } from 'bcryptjs';

export async function comparePassword(password: string, hash: string) {
  return await compare(password, hash);
}

export async function hashPassword(password: string) {
  const salt = await genSalt(10);
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}
