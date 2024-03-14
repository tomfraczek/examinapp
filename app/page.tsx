'use client';
import { SignInForm } from '@/app/components/signInForm';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './lib/firebase/firebase';
import { Dashboard } from '@/app/components/dashboard';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, []);
  return (
    <main className='min-h-screen flex flex-col justify-center items-center p-2'>
      {user ? <Dashboard /> : <SignInForm />}
    </main>
  );
}
