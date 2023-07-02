import { db } from "@/config";
import { COLLECTIONS } from "@/constants";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export const addLocation = async (input) => {
  const collectionRef = collection(db, COLLECTIONS.LOCATIONS);
  return await addDoc(collectionRef, {
    ...input,
    createdAt: serverTimestamp(),
    uid: "unknown",
  });
};
