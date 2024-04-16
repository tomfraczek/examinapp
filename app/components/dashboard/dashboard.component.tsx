"use client";
import { auth, db } from "@/app/lib/firebase/firebase";
import { getUserById } from "@/app/lib/firebase/helpers";
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";

type DashboardProps = {
  userId: string;
};

export const Dashboard = ({ userId }: DashboardProps) => {
  // const user = getUserById(userId);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const userData = await getUserById(userId);
  //       console.log(userData.docs);

  //       setUser(userData);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //     }
  //   };

  //   fetchUserData();
  // }, [userId]);

  const handleSignOut = () => {
    signOut(auth);
  };

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  );
};
