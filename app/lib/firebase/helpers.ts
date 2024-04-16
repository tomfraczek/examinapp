import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "./firebase";

export const getUserByEmail = async (email: string | null) => {
  const querySnapshot = await getDocs(
    query(collection(db, "users"), where("email", "==", email))
  );
  return !querySnapshot.empty;
};

export const getUserById = async (id: string | null) => {
  try {
    const q = query(collection(db, "users"), where("uid", "==", id));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching user document found with the provided ID.");
      return null;
    }

    let userData;
    querySnapshot.forEach((doc) => {
      userData = { id: doc.id, data: doc.data() };
    });

    return userData;
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
};
