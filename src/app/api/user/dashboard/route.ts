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

    const { date } = await request.json();
    const currentDate = new Date(date);
    const previousDate = new Date(date);
    previousDate.setDate(previousDate.getDate() - 1);

    const withdrawSum = await prisma.transactions.aggregate({
      where: {
        user: user,
        type: 'withdraw',
        date: {
          gte: new Date(currentDate),
          lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    });
    const previousWithdrawSum = await prisma.transactions.aggregate({
      where: {
        user: user,
        type: 'withdraw',
        date: {
          gte: new Date(previousDate),
          lte: new Date(previousDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    });
    const depositSum = await prisma.transactions.aggregate({
      where: {
        user: user,
        type: 'deposit',
        date: {
          gte: new Date(currentDate),
          lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    });
    const previousDepositSum = await prisma.transactions.aggregate({
      where: {
        user: user,
        type: 'deposit',
        date: {
          gte: new Date(previousDate),
          lte: new Date(previousDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    });
    const transferSum = await prisma.transactions.aggregate({
      where: {
        user: user,
        type: 'transfer',
        date: {
          gte: new Date(currentDate),
          lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    });
    const previousTransferSum = await prisma.transactions.aggregate({
      where: {
        user: user,
        type: 'transfer',
        date: {
          gte: new Date(previousDate),
          lte: new Date(previousDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
      _sum: {
        amount: true,
      },
    });

    const withdrawCount = await prisma.transactions.count({
      where: {
        user: user,
        type: 'withdraw',
        date: {
          gte: new Date(currentDate),
          lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    const depositCount = await prisma.transactions.count({
      where: {
        user: user,
        type: 'deposit',
        date: {
          gte: new Date(currentDate),
          lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    const transferCount = await prisma.transactions.count({
      where: {
        user: user,
        type: 'transfer',
        date: {
          gte: new Date(currentDate),
          lte: new Date(currentDate.getTime() + 24 * 60 * 60 * 1000),
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Successfully fetched data',
      data: {
        withdrawSum: withdrawSum._sum.amount || 0,
        depositSum: depositSum._sum.amount || 0,
        transferSum: transferSum._sum.amount || 0,
        previousWithdrawSum: previousWithdrawSum._sum.amount || 0,
        previousDepositSum: previousDepositSum._sum.amount || 0,
        previousTransferSum: previousTransferSum._sum.amount || 0,
        withdrawCount: withdrawCount || 0,
        depositCount: depositCount || 0,
        transferCount: transferCount || 0,
        transactionCount: withdrawCount + depositCount + transferCount,
        transactionSum:
          (withdrawSum._sum.amount ?? 0) +
          (depositSum._sum.amount ?? 0) +
          (transferSum._sum.amount ?? 0),
        previousTransactionSum:
          (previousWithdrawSum._sum.amount ?? 0) +
          (previousDepositSum._sum.amount ?? 0) +
          (previousTransferSum._sum.amount ?? 0),
      },
    } as ApiResponse);
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      message: 'Could not fetch data',
      data: error.message,
    } as ApiResponse);
  }
}
