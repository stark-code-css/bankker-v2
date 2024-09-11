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
    const res = await prisma.denomination.create({
      data: {
        user: user,
        date: new Date(body.date),
        fiveHundred: body.fiveHundred,
        twoHundred: body.twoHundred,
        oneHundred: body.oneHundred,
        fifty: body.fifty,
        twenty: body.twenty,
        ten: body.ten,
        bankOne: body.bankOne,
        bankTwo: body.bankTwo,
        bankThree: body.bankThree,
        others: body.others,
      },
    });
    return NextResponse.json({
      success: true,
      message: 'Denomination saved successfully',
      data: res,
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error saving denomination',
      error: error.message,
    } as ApiResponse);
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('Unauthorized');
    }
    const user = session.user.email as string;
    const body = await request.json();
    const res = await prisma.denomination.delete({
      where: {
        date_user: {
          date: new Date(body.date),
          user: user,
        },
      },
    });
    return NextResponse.json({
      success: true,
      message: 'Denomination deleted successfully',
      data: res,
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error deleting denomination',
      error: error.message,
    } as ApiResponse);
  }
}
