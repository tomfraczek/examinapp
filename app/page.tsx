"use client";
import { SignInForm } from "@/app/components/signInForm";

import { User, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth, db } from "./lib/firebase/firebase";
import { Dashboard } from "@/app/components/dashboard";

import { collection, addDoc } from "firebase/firestore";
import { Main } from "./page.styles";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      setUser(user);
    });
  }, []);
  return <Main>{user ? <Dashboard /> : <SignInForm />}</Main>;
}
