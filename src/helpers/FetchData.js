import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  onSnapshot,
} from "@firebase/firestore";
import { ThemeContext } from "layouts/Admin";
import { useContext } from "react";
import { db } from "utils/firebase";

export const fetchDataWisata = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "wisata"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (!querySnapshot.empty) {
      return data;
    }
    {
      throw querySnapshot.empty;
    }
  } catch (response) {
    return { error: response };
  }
};

export const FetchDataTransaksi = async () => {
  // const { context, setContext } = useContext(ThemeContext);
  try {
    const querySnapshot = await getDocs(collection(db, "transaksi"));
    const data = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    }));

    if (!querySnapshot.empty) {
      return data;
    }
    {
      throw querySnapshot.empty;
    }
  } catch (response) {
    return { error: response };
  }
};
