import { db } from "@/config";
import { DATABASE_PATHS } from "@/constants";
import { push, ref, serverTimestamp } from "firebase/database";

export const addLocation = (input) => {
  const dbRef = ref(db, DATABASE_PATHS.LOCATIONS);
  return push(dbRef, {
    ...input,
    createdAt: serverTimestamp(),
  });
};
