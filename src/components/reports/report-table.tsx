import React from 'react';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { toCapitalize, toCurrency, toDateStr } from '@/lib/utility';
import { Button } from '../ui/button';

type TransactionType = {
  date: string;
  type: string;
  name: string;
  aadhaar: string;
  amount: number;
  rrn: string;
  creditName: string;
  creditAadhaar: string;
};

const ReportTable = ({ data, handleDelete, handleEdit }: any) => {
  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-center">Type</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Aadhaar</TableHead>
            <TableHead className="text-center">Amount</TableHead>
            <TableHead className="text-center">RRN</TableHead>
            <TableHead className="text-center">Creditor&apos;s Name</TableHead>
            <TableHead className="text-center">
              Creditor&apos;s Aadhaar
            </TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item: TransactionType) => {
            return (
              <TableRow key={item.rrn}>
                <TableCell className="text-center">
                  {toDateStr(item.date)}
                </TableCell>
                <TableCell className="text-center">
                  {toCapitalize(item.type)}
                </TableCell>
                <TableCell className="text-center">{item.name}</TableCell>
                <TableCell className="text-center">{item.aadhaar}</TableCell>
                <TableCell className="text-center">
                  {toCurrency(item.amount)}
                </TableCell>
                <TableCell className="text-center">{item.rrn}</TableCell>
                <TableCell className="text-center">{item.creditName}</TableCell>
                <TableCell className="text-center">
                  {item.creditAadhaar}
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant={'link'}
                    size={'icon'}
                    className="text-3xl text-blue-500 hover:text-blue-500/60"
                    onClick={() => handleEdit(item.rrn)}>
                    {<MdModeEdit />}
                  </Button>
                  <Button
                    variant={'link'}
                    size={'icon'}
                    className="text-3xl text-red-500 hover:text-red-500/60"
                    onClick={() => handleDelete(item.rrn)}>
                    {<MdDelete />}
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ReportTable;
