import { auth } from '@/auth';
import { ApiResponse } from '@/lib/api';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { date, name, rrn, aadhaar, amount, creditName, creditAadhaar } =
      await request.json();
    const session = await auth();
    const user = session?.user?.email;

    if (!user) {
      throw new Error('Unauthorized');
    }

    // Save transaction to database
    const res = await prisma.transactions.create({
      data: {
        user: user,
        type: 'transfer',
        date: new Date(date),
        name: name,
        rrn: rrn,
        aadhaar: aadhaar,
        amount: Number.parseInt(amount),
        creditName: creditName,
        creditAadhaar: creditAadhaar,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Transaction saved',
      data: res,
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error saving transaction',
      error: error.message,
    } as ApiResponse);
  }
}
