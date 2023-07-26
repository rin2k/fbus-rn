import { db } from "@/config";
import { DATABASE_PATHS } from "@/constants";
import { get, ref, serverTimestamp, set, update } from "firebase/database";

export const addLocation = (routeId, busId, input) => {
  const dbRef = ref(db, `${DATABASE_PATHS.LOCATIONS}/${routeId}/${busId}`);

  return get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        // DocumentId tồn tại, thực hiện cập nhật
        return update(dbRef, {
          ...input,
          updatedAt: serverTimestamp(),
        });
      } else {
        // DocumentId không tồn tại, thực hiện thêm mới
        return set(dbRef, {
          ...input,
          // createdAt: serverTimestamp(),
          // updatedAt: serverTimestamp(),
        });
      }
    })
    .catch((error) => {
      console.log("Err:", error);
    });
};
