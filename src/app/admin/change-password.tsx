'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { userAddAction, userUpdateAction } from './actions';

const ChangePassword = () => {
  return (
    <div className="border p-6 rounded-lg w-96">
      <h2 className="text-xl font-bold">Change Password</h2>
      <form
        className="flex flex-col gap-2"
        action={(formData: FormData) => {
          userUpdateAction(formData)
            .then(() => {
              alert('User password changed successfully');
            })
            .catch((error: any) => {
              alert(error);
            });
        }}>
        <div>
          <Label>Name</Label>
          <Input type="text" name="name" />
        </div>
        <div>
          <Label>Email</Label>
          <Input type="email" name="email" />
        </div>
        <div>
          <Label>Password</Label>
          <Input type="text" name="password" />
        </div>
        <div className="flex flex-col">
          <p>Role</p>
          <select name="role" id="role" className="border rounded-lg p-2">
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
        </div>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default ChangePassword;
