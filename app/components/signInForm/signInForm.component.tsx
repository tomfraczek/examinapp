"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  CtaContainer,
  Header,
  LogoContainer,
  RegisterContainer,
  SignInWithEmailContainer,
  TextWhite,
} from "./signInForm.styles";
import { Input } from "@nextui-org/react";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import { MailIcon } from "./MailIcon";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/public/images/logoTrans.png";
import {
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import Link from "next/link";

import { auth, googleAuthProvider, db } from "@/app/lib/firebase/firebase";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

type Inputs = {
  email: string;
  password: string;
  displayName: string;
  exampleRequired: string;
};

export const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password, displayName } = data;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log(user);
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
    const querySnapshot = await getDocs(
      query(collection(db, "users"), where("email", "==", email))
    );
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
            const docRef = await addDoc(collection(db, "users"), {
              displayName,
              email,
              uid,
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
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
      <LogoContainer>
        <Image
          className="mb-4"
          src={Logo}
          width={100}
          height={100}
          alt="Logo"
        />
        <p className="text-3xl text-white">Sign in to ExaminApp</p>
      </LogoContainer>
      <CtaContainer>
        <Button
          onClick={handleGoogleSignIn}
          className="w-full mb-4"
          type="submit"
        >
          Sign in with google
        </Button>
      </CtaContainer>
      {/* <TextWhite>or</TextWhite> */}
      <SignInWithEmailContainer>
        <Header>Enter email and password</Header>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            className="mb-6"
            type="email"
            placeholder="you@example.com"
            labelPlacement="outside"
            startContent={
              <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
            }
            {...register("email")}
          />
          <Input
            placeholder="Enter your password"
            labelPlacement="outside"
            {...register("password")}
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={showPassword ? "text" : "password"}
          />
          {errors.exampleRequired && <span>This field is required</span>}

          <div className="w-full flex justify-end mt-6">
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </SignInWithEmailContainer>
      <RegisterContainer>
        <TextWhite>Register with Email and Password</TextWhite>
        <Link href="/signUp">Create an account</Link>
      </RegisterContainer>
    </>
  );
};
