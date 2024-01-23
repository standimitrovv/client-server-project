import { APIResponse } from '@/app/models/APIResponse';
import { IComment } from '../models/Comment';

interface Dependencies {
  text: string;
  userId: string;
}

export const createComment = async (
  deps: Dependencies
): Promise<APIResponse<IComment>> => {
  return (
    await fetch(`${process.env.NEXT_PUBLIC_API}/comments`, {
      method: 'POST',
      body: JSON.stringify(deps),
      headers: {
        'Content-Type': 'application/json',
      },
    })
  ).json();
};
