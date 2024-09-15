'use client';
import React, { useState } from 'react';
import TransactionCard from './TransactionCard';
import { TbSum } from 'react-icons/tb';
import { BiMoneyWithdraw } from 'react-icons/bi';
import { GiReceiveMoney } from 'react-icons/gi';
import { MdCurrencyExchange } from 'react-icons/md';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';

const TransactionSummary = () => {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [data, setData] = useState({
    transactionSum: 0,
    withdrawSum: 0,
    depositSum: 0,
    transferSum: 0,
    transactionCount: 0,
    withdrawCount: 0,
    depositCount: 0,
    transferCount: 0,
    previousTransactionSum: 0,
    previousWithdrawSum: 0,
    previousDepositSum: 0,
    previousTransferSum: 0,
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/dashboard`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date }),
      });
      const result = await response.json();
      setData(result.data);
      toast({
        title: 'Success',
        description: 'Transaction summary fetched successfully',
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to fetch transaction summary',
      });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-center mb-4">
        <form className="flex flex-col items-center md:flex-row gap-2">
          <p>Date: </p>
          <Input
            type="date"
            className="bg-white"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Button onClick={handleSubmit}>Go</Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="col-span-1">
          <TransactionCard
            title="Total Transactions"
            todayAmount={data.transactionSum}
            yesterdayAmount={data.previousTransactionSum}
            todayCount={data.transactionCount}
            Icon={TbSum}
          />
        </div>
        <div className="col-span-1">
          <TransactionCard
            title="Total Withdrawals"
            todayAmount={data.withdrawSum}
            yesterdayAmount={data.previousWithdrawSum}
            todayCount={data.withdrawCount}
            Icon={BiMoneyWithdraw}
          />
        </div>
        <div className="col-span-1">
          <TransactionCard
            title="Total Deposits"
            todayAmount={data.depositSum}
            yesterdayAmount={data.previousDepositSum}
            todayCount={data.depositCount}
            Icon={GiReceiveMoney}
          />
        </div>
        <div className="col-span-1">
          <TransactionCard
            title="Total Transfers"
            todayAmount={data.transferSum}
            yesterdayAmount={data.previousTransferSum}
            todayCount={data.transferCount}
            Icon={MdCurrencyExchange}
          />
        </div>
      </div>
    </div>
  );
};

export default TransactionSummary;
