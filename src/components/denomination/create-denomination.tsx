'use client';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Separator } from '../ui/separator';
import { toast } from '@/hooks/use-toast';

const CreateDenomination = () => {
  const [data, setData] = useState({
    date: new Date().toISOString().split('T')[0],
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

  const [total, setTotal] = useState(0);

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

  const handleChange = (e: any) => {
    setData({
      ...data,
      [e.target.name]: Number.parseInt(e.target.value),
    });
  };

  const handleReset = () => {
    setData({
      date: new Date().toISOString().split('T')[0],
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
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/user/denominations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      if (!response.success) {
        throw response;
      }
      toast({ title: 'Success', description: response.message });
      handleReset();
    } catch (error: any) {
      console.log(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.error,
      });
    }
  };

  return (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Create Denomination</CardTitle>
        <CardDescription>
          Create new denomination using the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="px-2 flex flex-col gap-2">
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="date">
              Date:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="date"
              name="date"
              type="date"
              value={data.date}
              onChange={(e) => {
                setData({ ...data, date: e.target.value });
              }}
              required
            />
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="fiveHundred">
              500x:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="fiveHundred"
              type="number"
              name="fiveHundred"
              value={data.fiveHundred}
              onChange={handleChange}
              required
            />
            <p className="text-center col-span-1">{data.fiveHundred * 500}</p>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="twoHundred">
              200x:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="twoHundred"
              type="number"
              name="twoHundred"
              value={data.twoHundred}
              onChange={handleChange}
              required
            />
            <p className="text-center col-span-1">{data.twoHundred * 200}</p>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="oneHundred">
              100x:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="oneHundred"
              type="number"
              name="oneHundred"
              value={data.oneHundred}
              onChange={handleChange}
              required
            />
            <p className="text-center col-span-1">{data.oneHundred * 100}</p>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="fifty">
              50x:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="fifty"
              type="number"
              name="fifty"
              value={data.fifty}
              onChange={handleChange}
              required
            />
            <p className="text-center col-span-1">{data.fifty * 50}</p>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="twenty">
              20x:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="twenty"
              type="number"
              name="twenty"
              value={data.twenty}
              onChange={handleChange}
              required
            />
            <p className="text-center col-span-1">{data.twenty * 20}</p>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="ten">
              10x:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="ten"
              type="number"
              name="ten"
              value={data.ten}
              onChange={handleChange}
              required
            />
            <p className="text-center col-span-1">{data.ten * 10}</p>
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="bankOne">
              Bank 1:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="bankOne"
              type="number"
              name="bankOne"
              value={data.bankOne}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="bankTwo">
              Bank 2:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="bankTwo"
              type="number"
              name="bankTwo"
              value={data.bankTwo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="bankThree">
              Bank 3:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="bankThree"
              type="number"
              name="bankThree"
              value={data.bankThree}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="others">
              Others:
            </Label>
            <Input
              className="col-span-3 px-4"
              id="others"
              type="number"
              name="others"
              value={data.others}
              onChange={handleChange}
              required
            />
          </div>
          <Separator className="my-2" />
          <div className="grid grid-cols-5 items-center">
            <Label className="col-span-1" htmlFor="total">
              Total:
            </Label>
            <div className="col-span-3 px-4"></div>
            <div id="total" className="text-center col-span-1">
              {total}
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center gap-2">
        <Button className="w-1/2" onClick={handleSubmit}>
          Save
        </Button>
        <Button className="w-1/2" variant={'outline'} onClick={handleReset}>
          Clear
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreateDenomination;
