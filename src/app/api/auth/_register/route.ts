import { ApiResponse } from '@/lib/api';
import prisma from '@/lib/db';
import { hashPassword } from '@/lib/hashPassword';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  // TODO: Secure this route for admin only

  try {
    const body = await request.json();

    if (
      body.name === '' ||
      body.email === '' ||
      body.password === '' ||
      body.role === ''
    ) {
      throw new Error('Email and password are required');
    }

    const hashedPassword = await hashPassword(body.password);

    const response = await prisma.users.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: body.role,
      },
    });
    return NextResponse.json({ success: true, data: response } as ApiResponse);
  } catch (e: any) {
    return NextResponse.json({
      success: false,
      message: e.message,
    } as ApiResponse);
  }
}
