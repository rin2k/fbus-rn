import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  databaseURL: "https://f-bus-map-default-rtdb.firebaseio.com",
};

const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
