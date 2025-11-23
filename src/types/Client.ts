export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: "new" | "in-progress" | "done";
  notes?: string;
}
