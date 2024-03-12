'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Header, SignInFormContainer } from './signInForm.styles';
import TextField from '@mui/material/TextField';

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
    <SignInFormContainer>
      <Header>Login to explore</Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* register your input into the hook by invoking the "register" function */}
        <input defaultValue='test' {...register('example')} />
        <TextField id='outlined-basic' label='Outlined' variant='outlined' />
        <TextField id='filled-basic' label='Filled' variant='filled' />
        <TextField id='standard-basic' label='Standard' variant='standard' />
        {/* include validation with required or other standard HTML validation rules */}
        <input {...register('exampleRequired', { required: true })} />
        {/* errors will return when field validation fails  */}
        {errors.exampleRequired && <span>This field is required</span>}

        <input type='submit' />
      </form>
    </SignInFormContainer>
  );
};
