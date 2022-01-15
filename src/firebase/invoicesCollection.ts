import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

import { Invoice } from "../models/Invoice";

const db = getFirestore();

/** Fetches the invoices created by the current user from Firestore */
export const getInvoicesCollection = async (email: string) => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "invoices"), where("createdBy", "==", email))
    );
    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Invoice),
    }));
  } catch (error) {
    console.error(error);
  }
};

export default getInvoicesCollection;
