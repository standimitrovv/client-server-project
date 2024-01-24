export interface RegisterModel {
  username: string;
  email: string;
  password: string;
}

export const registerRequest = async (req: RegisterModel) =>
  await fetch(`${process.env.NEXT_PUBLIC_API}/users/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(req),
  });
