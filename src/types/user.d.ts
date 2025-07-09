export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
  role: "admin" | "user" | "vendor";
  isActive: boolean;
  image: string;
  address: string; // Optional field for user address
}
