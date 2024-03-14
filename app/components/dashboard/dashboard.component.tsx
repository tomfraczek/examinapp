'use client';
import { auth } from '@/app/lib/firebase/firebase';
import { signOut } from 'firebase/auth';

export const Dashboard = () => {
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};
