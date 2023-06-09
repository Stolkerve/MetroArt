export interface User {
    id: string,
    username: string;
    email: string;
    phone: string;
    favorites?: string[];
    role?: string;
    name?: string;
  }