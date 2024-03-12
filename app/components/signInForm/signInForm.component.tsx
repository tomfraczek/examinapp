'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Header, SignInFormContainer } from './signInForm.styles';
import { Input } from '@nextui-org/react';

type Inputs = {
  example: string;
  exampleRequired: string;
};

export const SignInForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('example')); // watch input value by passing the name of it

  return (
    <div className='flex w-full flex-wrap md:flex-nowrap gap-4'>
      <Input type='email' label='Email' />
      <Input type='email' label='Email' placeholder='Enter your email' />
    </div>
  );
};
