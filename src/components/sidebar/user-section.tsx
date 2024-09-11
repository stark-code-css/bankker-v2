'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useSession } from 'next-auth/react';

const UserSection = () => {
  const session = useSession();
  return (
    <div className="flex items-center justify-center space-x-5">
      <div>
        <Avatar className="w-16 h-16 md:w-20 md:h-20">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>{'SS'}</AvatarFallback>
        </Avatar>
      </div>
      <div className="hidden md:block">
        <p className="text-lg font-semibold">{session.data?.user?.name}</p>
        <p className="text-sm text-muted-foreground">
          {session.data?.user?.email}
        </p>
      </div>
    </div>
  );
};

export default UserSection;
