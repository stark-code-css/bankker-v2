'use client';
import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import ReportTable from './report-table';
import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const ReportForm = () => {
  const router = useRouter();

  const [result, setResult] = useState([]);

  const [data, setData] = useState({
    type: 'all',
    date: new Date(Date.now()).toISOString().split('T')[0],
  });

  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleDelete = async (rrn: string) => {
    try {
      const confirmation =
        window.prompt('Enter OK in block letters to confirm') === 'OK';
      if (!confirmation) {
        throw new Error('Deletion cancelled!');
      }
      const res = await fetch('/api/user/transactions', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rrn }),
      });
      const response = await res.json();
      if (!response.success) {
        throw new Error(response.error);
      }
      setResult(result.filter((item: any) => item.rrn !== rrn));
      toast({
        title: 'Successful',
        description: 'Successfully fetched the data',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error!',
        description: error.message,
      });
      console.error(error);
    }
  };

  const handleEdit = (rrn: string) => {
    console.log(rrn);
    router.push(`/user/transactions/${rrn}`);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      setResult(result.data);
      toast({
        title: 'Successful',
        description: 'Successfully fetched the data',
      });
    } catch (error: any) {
      toast({ title: 'error', description: error.error });
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col justify-center gap-4">
      <div className="flex justify-center">
        <form className="flex flex-col md:flex-row gap-2">
          <select
            name="type"
            id="type"
            className="border rounded-md p-2"
            defaultValue={data.type}
            onChange={handleChange}>
            <option value="all">All</option>
            <option value="withdraw">Withdraw</option>
            <option value="deposit">Deposit</option>
            <option value="transfer">Transfer</option>
          </select>
          <Input
            type="date"
            name="date"
            id="date"
            value={data.date}
            onChange={handleChange}
          />
          <Button onClick={handleSubmit}>Search</Button>
        </form>
      </div>
      <div>
        <ReportTable
          data={result}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </div>
    </div>
  );
};

export default ReportForm;
