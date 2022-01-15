import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  deleteDoc,
} from "firebase/firestore";

import { Invoice } from "../models/Invoice";

const db = getFirestore();

export const getInvoices = async (email: string) => {
  try {
    const snapshot = await getDocs(
      query(collection(db, "invoices"), where("createdBy", "==", email))
    );

    return snapshot.docs.map((doc) => ({
      ...(doc.data() as Invoice),
      documentId: doc.id,
    }));
  } catch (error) {
    console.error(error);
  }
};

export const deleteInvoice = async (documentId: string) => {
  try {
    await deleteDoc(doc(db, "invoices", documentId));
  } catch (error) {
    console.error(error);
  }
};
