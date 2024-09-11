import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import ReportForm from './report-form';

const ReportCard = () => {
  return (
    <Card className="w-full xl:w-[80%]">
      <CardHeader>
        <CardTitle>Reports</CardTitle>
        <CardDescription>
          Transactions records will be displayed here.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReportForm />
      </CardContent>
    </Card>
  );
};

export default ReportCard;
