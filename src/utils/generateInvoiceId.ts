import { Invoice } from "../models/Invoice";

const alphabet = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const randomLetter = () =>
  alphabet[Math.floor(Math.random() * alphabet.length)];

const randomDigit = () => Math.floor(Math.random() * 9);

/** Generates an invoice id composed of two letters followed by 4 digits, ex: AU4168 */
const generateInvoiceId = (invoices: Invoice[]): string => {
  const id =
    randomLetter() +
    randomLetter() +
    randomDigit() +
    randomDigit() +
    randomDigit() +
    randomDigit();

  // If the id already exists, generates another
  const idAlreadyExists = invoices.some((invoice) => invoice.id === id);
  if (idAlreadyExists) return generateInvoiceId(invoices);

  return id;
};

export default generateInvoiceId;
