export interface User {
  id: string;
  password: string;
  username: string;
  name: string;
  email: string;
  emailVerified: Date | null;
  image: string | null;
  createdAt: string;
  updatedAt: string;
}
