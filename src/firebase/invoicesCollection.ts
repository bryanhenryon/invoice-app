import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  doc,
  addDoc,
  deleteDoc,
  orderBy,
  updateDoc,
} from "firebase/firestore";

import { Invoice } from "../models/Invoice";

const db = getFirestore();

export const getInvoices = async (email: string) => {
  const snapshot = await getDocs(
    query(
      collection(db, "invoices"),
      orderBy("timestamp", "desc"),
      where("createdBy", "==", email)
    )
  );

  return snapshot.docs.map((doc) => ({
    ...(doc.data() as Invoice),
    documentId: doc.id,
    timestamp: doc.data().timestamp.toDate(),
  }));
};

export const addInvoice = async (data: Invoice) => {
  await addDoc(collection(db, "invoices"), data);
};

export const editInvoice = async (data: any) => {
  const invoiceRef = doc(db, "invoices", data.documentId);
  await updateDoc(invoiceRef, data);
};

export const deleteInvoice = async (documentId: string) =>
  await deleteDoc(doc(db, "invoices", documentId));
