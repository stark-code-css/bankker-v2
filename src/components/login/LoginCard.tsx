'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { toast } from '@/hooks/use-toast';
import { authenticate } from '@/app/auth/actions';

const LoginCard = () => {
  return (
    <Card className="w-full h-full p-8">
      <CardHeader className="px-0 pt-0">
        <CardTitle>Login to continue</CardTitle>
        <CardDescription>Please login using email to continue</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5 px-0 pb-0">
        <form
          className="space-y-3"
          action={async (formData: FormData) => {
            await authenticate(formData);
          }}>
          <Input
            className="p-4 h-12 text-md"
            name="email"
            type="email"
            placeholder="Email"
            disabled={false}
            required
          />
          <Input
            className="p-4 h-12 text-md"
            name="password"
            type="password"
            placeholder="Password"
            disabled={false}
            required
          />
          <Button className="w-full" size={'lg'} type="submit">
            Login
          </Button>
          <Button
            variant={'outline'}
            className="w-full"
            size={'lg'}
            type="reset">
            Reset
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
