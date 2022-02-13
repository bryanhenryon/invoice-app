export default interface checkboxStatus {
  id: number;
  text: string;
  name: "paid" | "pending" | "draft";
  checked: boolean;
}
