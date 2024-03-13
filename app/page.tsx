'use client';
import Image from 'next/image';
import styles from './page.module.css';
import { SignInForm } from '@/app/components/signInForm';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Dashboard } from '@/app/components/dashboard';

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className='min-h-screen flex flex-col justify-center items-center p-2'>
      {session && session.user ? <Dashboard /> : <SignInForm />}
    </main>
  );
}
