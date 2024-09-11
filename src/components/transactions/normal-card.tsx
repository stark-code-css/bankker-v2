'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { validateInput } from '@/lib/utility';

const NormalTransaction = () => {
  const [data, setData] = useState({
    type: 'withdraw',
    date: new Date().toISOString().split('T')[0],
    amount: '',
    name: '',
    aadhaar: '',
    rrn: '',
  });

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = () => {
    setData({
      type: 'withdraw',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      name: '',
      aadhaar: '',
      rrn: '',
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      validateInput(data);
      const res = await fetch('/api/user/transactions/normal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (response.success) {
        toast({
          title: 'Successful',
          description: 'Transaction has been created successfully',
        });
        handleReset();
      } else {
        throw new Error(response.error);
      }
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Unable to create transaction',
        description: error.message,
      });
    }
  };

  return (
    <Card>
      <form>
        <CardContent className="p-8 flex flex-col gap-2">
          <div className="flex justify-center gap-4">
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                id="withdraw"
                checked={data.type === 'withdraw'}
                value={'withdraw'}
                onChange={handleChange}
                required
              />
              <label htmlFor="withdraw">Withdraw</label>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="radio"
                name="type"
                id="deposit"
                checked={data.type === 'deposit'}
                value={'deposit'}
                onChange={handleChange}
                required
              />
              <label htmlFor="deposit">Deposit</label>
            </div>
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              name="name"
              value={data.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="aadhaar">Aadhaar Number</Label>
            <Input
              id="aadhaar"
              type="text"
              name="aadhaar"
              value={data.aadhaar}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="rrn">RR Number</Label>
            <Input
              id="rrn"
              type="text"
              name="rrn"
              value={data.rrn}
              onChange={handleChange}
              required
            />
          </div>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button onClick={handleSubmit}>
            {data.type === 'withdraw' ? 'Withdraw' : 'Deposit'}
          </Button>
          <Button variant={'outline'} onClick={handleReset}>
            Reset
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default NormalTransaction;
