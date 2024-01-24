import { User } from '../models/User';

export interface LoginModel {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  token: string;
}

export const loginRequest = async (req: LoginModel): Promise<LoginResponse> =>
  (
    await fetch(`${process.env.NEXT_PUBLIC_API}/users/login`, {
      method: 'POST',
      body: JSON.stringify(req),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
