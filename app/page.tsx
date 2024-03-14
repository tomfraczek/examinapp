'use client';
import { SignInForm } from '@/app/components/signInForm';

import { User, onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db } from './lib/firebase/firebase';
import { Dashboard } from '@/app/components/dashboard';

import { collection, addDoc } from 'firebase/firestore';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      // if (user) {
      //   const { displayName, email, uid } = user as {
      //     displayName: string | null;
      //     email: string | null;
      //     uid: string | null;
      //   };
      //   console.log(user);

      //   try {
      //     const docRef = await addDoc(collection(db, 'users'), {
      //       displayName,
      //       email,
      //       uid,
      //     });
      //     console.log('Document written with ID: ', docRef.id);
      //   } catch (e) {
      //     console.error('Error adding document: ', e);
      //   }
      // }
      setUser(user);
    });
  }, []);
  return (
    <main className='min-h-screen flex flex-col justify-center items-center p-2'>
      {user ? <Dashboard /> : <SignInForm />}
    </main>
  );
}
