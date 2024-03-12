'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Header, SignInFormContainer, CtaContainer } from './signInForm.styles';
import { Input } from '@nextui-org/react';
import { EyeFilledIcon } from './EyeFilledIcon';
import { EyeSlashFilledIcon } from './EyeSlashFilledIcon';
import { MailIcon } from './MailIcon';
import { Button } from '@nextui-org/react';

type Inputs = {
  email: string;
  password: string;
  exampleRequired: string;
};

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  console.log(watch('email')); // watch input value by passing the name of it

  return (
    <SignInFormContainer>
      <Header>Enter email and password</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          className='mb-3'
          type='email'
          placeholder='you@example.com'
          labelPlacement='outside'
          startContent={<MailIcon className='text-2xl text-default-400 pointer-events-none flex-shrink-0' />}
          {...register('email')}
        />
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
        />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <CtaContainer>
          <Button type='submit'>Submit</Button>
        </CtaContainer>
      </form>
    </SignInFormContainer>
  );
};
