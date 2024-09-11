'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardFooter } from '../ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Button } from '../ui/button';
import { validateInput } from '@/lib/utility';

const TransferCard = () => {
  const [data, setData] = useState({
    type: 'transfer',
    date: new Date().toISOString().split('T')[0],
    name: '',
    creditName: '',
    amount: '',
    aadhaar: '',
    creditAadhaar: '',
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
      type: 'transfer',
      date: new Date().toISOString().split('T')[0],
      amount: '',
      name: '',
      creditName: '',
      aadhaar: '',
      creditAadhaar: '',
      rrn: '',
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      validateInput(data);
      const res = await fetch('/api/user/transactions/transfer', {
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
            <Label htmlFor="name">Debitor&apos;s Name</Label>
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
            <Label htmlFor="creditName">Creditor&apos;s Name</Label>
            <Input
              id="creditName"
              type="text"
              name="creditName"
              value={data.creditName}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="aadhaar">Debitor&apos;s Aadhaar Number</Label>
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
            <Label htmlFor="creditAadhaar">Creditor's Aadhaar Number</Label>
            <Input
              id="creditAadhaar"
              type="text"
              name="creditAadhaar"
              value={data.creditAadhaar}
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
          <Button onClick={handleSubmit}>Transfer</Button>
          <Button variant={'outline'} onClick={handleReset}>
            Reset
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default TransferCard;
