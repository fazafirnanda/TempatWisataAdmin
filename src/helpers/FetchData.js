import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "@firebase/firestore";
import { db } from "utils/firebase";

export const fetchDataWisata = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "wisata"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (!querySnapshot.empty) {
      console.log(data);
      return data;
    }
    {
      throw querySnapshot.empty;
    }
  } catch (response) {
    return { error: response };
  }
};
