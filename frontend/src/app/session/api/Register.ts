import { User } from '../models/User';

export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  errorMessages: string[];
  result: User | null;
  statusCode: number;
}

export const registerRequest = async (
  req: RegisterModel
): Promise<RegisterResponse> =>
  (
    await fetch(`${process.env.NEXT_PUBLIC_API}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req),
    })
  ).json();
