'use client';
import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { toast } from '@/hooks/use-toast';
import { usePathname, useRouter } from 'next/navigation';
import { validateInput } from '@/lib/utility';

const EditCard = () => {
  const router = useRouter();
  const [data, setData] = useState({
    type: '',
    date: '',
    amount: '',
    name: '',
    aadhaar: '',
    rrn: '',
    creditName: '',
    creditAadhaar: '',
  });

  const rrn = usePathname().split('/').pop();
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('/api/user/transactions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ rrn }),
        });
        const result = await response.json();
        if (!result.success) {
          throw new Error(result.error);
        }
        toast({ title: 'Success', description: 'Data fetched successfully' });
        setData({
          ...result.data,
          date: new Date(result.data.date).toISOString().split('T')[0],
        });
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.message,
        });
        console.log(error);
      }
    }
    fetchData();
  }, []);

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
      creditName: '',
      creditAadhaar: '',
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      validateInput(data);
      const response = await fetch('/api/user/transactions', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rrn: rrn, data: data }),
      });
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }
      toast({ title: 'Success', description: 'Data updated successfully' });
      router.push('/user/reports');
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
      console.log(error);
    }
  };

  return (
    <Card className="w-[600px] ">
      <CardHeader>
        <CardTitle>Update Transactions</CardTitle>
        <CardDescription>
          Update your transactions using the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
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
                <div className="flex items-center gap-1">
                  <input
                    type="radio"
                    name="type"
                    id="transfer"
                    checked={data.type === 'transfer'}
                    value={'transfer'}
                    onChange={handleChange}
                    required
                  />
                  <label htmlFor="transfer">Transfer</label>
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
                <Label htmlFor="creditAadhaar">
                  Creditor&apos;s Aadhaar Number
                </Label>
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
              <Button onClick={handleSubmit}>Update</Button>
              <Button variant={'outline'} onClick={handleReset}>
                Reset
              </Button>
            </CardFooter>
          </form>
        </Card>
      </CardContent>
    </Card>
  );
};

export default EditCard;
