import { auth } from '@/auth';
import { ApiResponse } from '@/lib/api';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { date, type } = await request.json();
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('Unauthorized');
    }
    const user = session.user.email as string;

    const requestDate = new Date(date);
    const requestType = type === 'all' ? undefined : type;

    const res = await prisma.transactions.findMany({
      where: {
        user: user,
        date: {
          gte: requestDate,
          lt: new Date(requestDate.getTime() + 24 * 60 * 60 * 1000),
        },
        type: requestType,
      },
    });
    return NextResponse.json({
      success: true,
      message: 'Successful',
      data: res.reverse(),
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message,
    } as ApiResponse);
  }
}
