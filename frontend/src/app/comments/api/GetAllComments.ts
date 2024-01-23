import { APIResponse } from '@/app/models/APIResponse';
import { IComment } from '../models/Comment';

const DEFAULT_PAGE_SIZE = 10;

const DEFAULT_PAGE_NUMBER = 1;

interface Options {
  pageSize?: number;
  pageNumber?: number;
}

export const getAllComments = async ({
  pageSize = DEFAULT_PAGE_SIZE,
  pageNumber = DEFAULT_PAGE_NUMBER,
}: Options): Promise<APIResponse<IComment[]>> => {
  return (
    await fetch(
      `${process.env.NEXT_PUBLIC_API}/comments?pageSize=${pageSize}&pageNumber=${pageNumber}`
    )
  ).json();
};
