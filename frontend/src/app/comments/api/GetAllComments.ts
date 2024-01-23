import { APIResponse } from '@/app/models/APIResponse';
import { IComment } from '../models/Comment';

export const getAllComments = async (): Promise<APIResponse<IComment[]>> => {
  return (await fetch(`${process.env.NEXT_PUBLIC_API}/comments`)).json();
};
