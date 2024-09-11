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
    const { rrn } = await request.json();
    const res = await prisma.transactions.findFirstOrThrow({
      where: {
        user: session.user.email as string,
        rrn: rrn,
      },
    });
    return NextResponse.json({
      success: true,
      message: 'Transactions fetched successfully',
      data: res,
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error fetching transactions',
      error: error.message,
      data: {},
    } as ApiResponse);
  }
}

export async function DELETE(request: Request) {
  try {
    const { rrn } = await request.json();
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('Unauthorized');
    }
    const user = session.user.email as string;

    if (!rrn) {
      return NextResponse.json({
        success: false,
        message: 'Invalid request',
      } as ApiResponse);
    }

    const res = await prisma.transactions.delete({
      where: {
        user: user,
        rrn: rrn,
      },
    });
    return NextResponse.json({
      success: true,
      message: 'Transaction deleted successfully',
      data: res,
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error deleting transaction',
      error: error.message,
      data: {},
    } as ApiResponse);
  }
}

export async function PUT(request: Request) {
  try {
    const { rrn, data } = await request.json();
    const session = await auth();
    if (!session || !session.user) {
      throw new Error('Unauthorized');
    }
    const user = session.user.email as string;

    if (!rrn || !data) {
      throw new Error('Invalid request');
    }

    const res = await prisma.transactions.update({
      where: {
        user: user,
        rrn: rrn,
      },
      data: {
        date: new Date(data.date),
        type: data.type,
        amount: Number.parseInt(data.amount),
        name: data.name,
        aadhaar: data.aadhaar,
        creditName: data.creditName,
        creditAadhaar: data.creditAadhaar,
        rrn: data.rrn,
      },
    });
    return NextResponse.json({
      success: true,
      message: 'Transaction updated successfully',
      data: res,
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Error updating transaction',
      error: error.message,
      data: {},
    } as ApiResponse);
  }
}
