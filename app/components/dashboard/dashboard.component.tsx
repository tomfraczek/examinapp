'use client';
import { signOut } from 'next-auth/react';
import React from 'react';

export const Dashboard = () => {
  return (
    <div>
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
};
