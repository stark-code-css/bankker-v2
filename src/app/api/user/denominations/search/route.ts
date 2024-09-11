import { auth } from '@/auth';
import { ApiResponse } from '@/lib/api';
import prisma from '@/lib/db';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('Unauthorized');
    }
    const user = session.user.email as string;
    const body = await request.json();
    const date = body.date;

    const res = await prisma.denomination.findFirstOrThrow({
      where: {
        user: user,
        date: {
          gte: new Date(date),
          lte: new Date(new Date(date).getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Denomination saved successfully',
      data: {
        fiveHundred: res.fiveHundred,
        twoHundred: res.twoHundred,
        oneHundred: res.oneHundred,
        fifty: res.fifty,
        twenty: res.twenty,
        ten: res.ten,
        bankOne: res.bankOne,
        bankTwo: res.bankTwo,
        bankThree: res.bankThree,
        others: res.others,
      },
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching denomination',
      error: error.message,
    } as ApiResponse);
  }
}
