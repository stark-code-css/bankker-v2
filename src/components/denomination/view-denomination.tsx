'use client';
import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toast } from '@/hooks/use-toast';
import { Separator } from '../ui/separator';

const ViewDenomination = () => {
  const [data, setData] = React.useState({
    fiveHundred: 0,
    twoHundred: 0,
    oneHundred: 0,
    fifty: 0,
    twenty: 0,
    ten: 0,
    bankOne: 0,
    bankTwo: 0,
    bankThree: 0,
    others: 0,
  });

  const [date, setDate] = React.useState(
    new Date().toISOString().split('T')[0]
  );

  const [total, setTotal] = React.useState(0);

  const handleSearch = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch(
        'http://localhost:3000/api/user/denominations/search',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date }),
        }
      );
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }
      setData({
        fiveHundred: result.data.fiveHundred,
        twoHundred: result.data.twoHundred,
        oneHundred: result.data.oneHundred,
        fifty: result.data.fifty,
        twenty: result.data.twenty,
        ten: result.data.ten,
        bankOne: result.data.bankOne,
        bankTwo: result.data.bankTwo,
        bankThree: result.data.bankThree,
        others: result.data.others,
      });
      toast({
        title: 'Success',
        description: 'Denomination fetched successfully',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message,
      });
      console.log(error);
    }
  };

  useEffect(() => {
    setTotal(
      data.fiveHundred * 500 +
        data.twoHundred * 200 +
        data.oneHundred * 100 +
        data.fifty * 50 +
        data.twenty * 20 +
        data.ten * 10 +
        data.bankOne +
        data.bankTwo +
        data.bankThree +
        data.others
    );
  }, [data]);

  const handleDelete = async (e: any) => {
    e.preventDefault();
    try {
      const confirmation =
        window.prompt('Enter OK in block letters to confirm deletion') === 'OK';
      if (!confirmation) {
        throw new Error('Deletion cancelled!');
      }
      const response = await fetch(
        'http://localhost:3000/api/user/denominations',
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date }),
        }
      );
      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }
      toast({
        title: 'Success',
        description: 'Denomination deleted successfully',
      });
      setData({
        fiveHundred: 0,
        twoHundred: 0,
        oneHundred: 0,
        fifty: 0,
        twenty: 0,
        ten: 0,
        bankOne: 0,
        bankTwo: 0,
        bankThree: 0,
        others: 0,
      });
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
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>View Denomination</CardTitle>
        <CardDescription>
          Search Denominations using the form below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        <div className="flex justify-center">
          <form className="flex items-center gap-2">
            <Label>Date</Label>
            <Input
              name="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
            <Button onClick={handleSearch}>Search</Button>
            <Button variant={'destructive'} onClick={handleDelete}>
              Delete
            </Button>
          </form>
        </div>
        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Currency</TableHead>
                <TableHead>Count</TableHead>
                <TableHead>Value</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>500x</TableCell>
                <TableCell>{data.fiveHundred}</TableCell>
                <TableCell>{data.fiveHundred * 500}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>200x</TableCell>
                <TableCell>{data.twoHundred}</TableCell>
                <TableCell>{data.twoHundred * 200}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>100x</TableCell>
                <TableCell>{data.oneHundred}</TableCell>
                <TableCell>{data.oneHundred * 100}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>50x</TableCell>
                <TableCell>{data.fifty}</TableCell>
                <TableCell>{data.fifty * 50}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>20x</TableCell>
                <TableCell>{data.twenty}</TableCell>
                <TableCell>{data.twenty * 20}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>10x</TableCell>
                <TableCell>{data.ten}</TableCell>
                <TableCell>{data.ten * 10}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bank 1</TableCell>
                <TableCell></TableCell>
                <TableCell>{data.bankOne}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bank 2</TableCell>
                <TableCell></TableCell>
                <TableCell>{data.bankTwo}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bank 3</TableCell>
                <TableCell></TableCell>
                <TableCell>{data.bankThree}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Others</TableCell>
                <TableCell></TableCell>
                <TableCell>{data.others}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-bold">Total</TableCell>
                <TableCell className="font-bold"></TableCell>
                <TableCell className="font-bold">{total}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewDenomination;
