import Image from 'next/image';
import styles from './page.module.css';
import { SignInForm } from '@/app/components/signInForm';
import Logo from '@/public/images/logoTrans.png';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='min-h-screen flex flex-col justify-center items-center p-2'>
      <div className='flex-initial mb-10 flex flex-col items-center'>
        <Image className='mb-4' src={Logo} width={100} height={100} alt='Logo' />
        <p className='text-3xl text-white'>Sign in to ExaminApp</p>
      </div>
      <SignInForm />
      <div className='border border-gray-800 w-96 mt-4 rounded-lg p-5 flex'>
        <p className='mr-2'>New to Examinap?</p> <Link href='/signUp'>Create an account</Link>
      </div>
    </main>
  );
}
