import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '../ui/card';

type TransactionCardProps = {
  Icon?: any;
  title: string;
  todayAmount: number;
  todayCount: number;
  yesterdayAmount: number;
};

const TransactionCard = ({
  Icon,
  title,
  todayAmount,
  todayCount,
  yesterdayAmount,
}: TransactionCardProps) => {
  const calculatePercentage = (today: number, yesterday: number) => {
    if (!today && !yesterday) {
      return 0;
    }
    if (today > yesterday) {
      return (((today - yesterday) / yesterday) * 100).toFixed(0);
    } else {
      return (((yesterday - today) / yesterday) * 100).toFixed(0);
    }
  };

  return (
    <Card className="overflow-hidden w-full h-full p-0">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="bg-bgGray rounded-full p-2">
            {Icon && <Icon className="w-8 h-8" />}
          </span>
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="ml-8 flex flex-col gap-2">
        <p className="font-medium text-2xl">
          {todayAmount.toLocaleString('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0,
            roundingMode: 'floor',
          })}
        </p>
        <p className="text-muted-foreground">Count: {todayCount}</p>
      </CardContent>
      <CardFooter className="ml-6">
        {todayAmount >= yesterdayAmount ? (
          <p className="text-emerald-600">
            {calculatePercentage(todayAmount, yesterdayAmount)}% more than
            previous day
          </p>
        ) : (
          <p className="text-red-600">
            {calculatePercentage(todayAmount, yesterdayAmount)}% less than
            previous day
          </p>
        )}
      </CardFooter>
    </Card>
  );
};

export default TransactionCard;
