export type AuthMode = 'signIn' | 'register';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AppSession {
  user: {
    id: string;
    email: string;
    name: string;
  };
  token?: string;
  createdAt: string;
  expiresAt?: string;
}

export interface SignInRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  username: string;
}

export interface AuthResponse {
  user: AuthUser;
  token?: string;
  expiresAt?: string;
}