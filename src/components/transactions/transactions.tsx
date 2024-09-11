import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Tabs, TabsContent, TabsList } from '../ui/tabs';
import { TabsTrigger } from '@radix-ui/react-tabs';
import NormalTransaction from './normal-card';
import TransferCard from './transfer-card';

const CreateTransactions = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          Record transactions using the form below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="normal" className="w-[600px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="normal">Normal</TabsTrigger>
            <TabsTrigger value="transfer">Fund Transfer</TabsTrigger>
          </TabsList>
          <TabsContent value="normal">
            <NormalTransaction />
          </TabsContent>
          <TabsContent value="transfer">
            <TransferCard />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CreateTransactions;
