'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Header } from './signUpForm.styles';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { MailIcon } from './MailIcon';
import { Button } from '@nextui-org/react';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import Logo from '@/public/images/logoTrans.png';
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword } from 'firebase/auth';
import Link from 'next/link';

import { auth, googleAuthProvider, db } from '@/app/lib/firebase/firebase';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

type Inputs = {
  email: string;
  password: string;
  displayName: string;
  confirmPassword: string;
  exampleRequired: string;
};

export const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const route = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, displayName } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up
        const user = userCredential.user;
        const userExists = await getUserByEmail(email);

        if (!userExists)
          try {
            const docRef = await addDoc(collection(db, 'users'), {
              displayName,
              email,
              uid: user.uid,
            });
            console.log('Document written with ID: ', docRef.id);
            route.push('/');
          } catch (e) {
            console.error('Error adding document: ', e);
          }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  // console.log(watch('email')); // watch input value by passing the name of it

  // const addToDB = async ({ displayName, email, uid }) => {};
  const getUserByEmail = async (email: string | null) => {
    const querySnapshot = await getDocs(query(collection(db, 'users'), where('email', '==', email)));
    return !querySnapshot.empty;
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleAuthProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        const { displayName, email, uid } = user as {
          displayName: string | null;
          email: string | null;
          uid: string | null;
        };

        const userExists = await getUserByEmail(email);

        if (!userExists)
          try {
            const docRef = await addDoc(collection(db, 'users'), {
              displayName,
              email,
              uid,
            });

            console.log('Document written with ID: ', docRef.id);
          } catch (e) {
            console.error('Error adding document: ', e);
          }

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <>
      <div className='flex-initial mb-10 flex flex-col items-center'>
        <Image className='mb-4' src={Logo} width={100} height={100} alt='Logo' />
        <p className='text-3xl text-white'>Sign Up to ExaminApp</p>
      </div>
      <div className='border border-gray-800 bg-gray-900 w-96 mt-4 rounded-lg p-5 flex flex-col'>
        <Header>Fill the form end press submit</Header>
        <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
          <Input
            type='displayName'
            placeholder='Your name'
            labelPlacement='outside'
            {...register('displayName', { required: 'Name is required', pattern: /^[A-Za-z]{3,}$/i })}
          />
          {errors.displayName && <span className='text-red-500'>{errors.displayName.message}</span>}
          <Input
            type='text'
            placeholder='you@example.com'
            labelPlacement='outside'
            startContent={<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'invalid email address',
              },
            })}
          />
          {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
          <Input
            placeholder='Enter your password'
            labelPlacement='outside'
            endContent={
              <button className='focus:outline-none' type='button' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={showPassword ? 'text' : 'password'}
            {...register('password', {
              required: 'Password is required',
              minLength: { value: 8, message: 'Password must be at least 8 characters long' },
              pattern: {
                value: /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: 'Password must contain at least one uppercase letter, one number, and one special character',
              },
            })}
          />
          {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
          <Input
            placeholder='Confirm your password'
            labelPlacement='outside'
            endContent={
              <button
                className='focus:outline-none'
                type='button'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                ) : (
                  <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
                )}
              </button>
            }
            type={showConfirmPassword ? 'text' : 'password'}
            {...register('confirmPassword', {
              required: 'Please confirm your password',
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
          />
          {errors.confirmPassword && <span className='text-red-500'>{errors.confirmPassword.message}</span>}
          <div className='w-full flex justify-end mt-6'>
            <Button type='submit'>Sign Up</Button>
          </div>
        </form>
      </div>
    </>
  );
};
