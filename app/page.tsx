import Image from 'next/image';
import styles from './page.module.css';
import { SignInForm } from '@/app/components/signInForm';

export default function Home() {
  return (
    <main className={styles.main}>
      <SignInForm />
    </main>
  );
}
