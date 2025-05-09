export interface User{
  name: string;
  email: string;
  password: string;
  role: 'ADMIN_HOTEL' | "CLIENT";

}

export interface AuthResponse{
    message?: string;
    error?: string;
    token?: string;
}