import { APIResponse } from '@/app/models/APIResponse';
import { IComment } from '../models/Comment';

export enum GetAllCommentsDefaultQueryValues {
  DEFAULT_PAGE_SIZE = 12,
  DEFAULT_PAGE_NUMBER = 1,
}

interface Options {
  pageSize?: number;
  pageNumber?: number;
}

export const getAllComments = async ({
  pageSize = GetAllCommentsDefaultQueryValues.DEFAULT_PAGE_SIZE,
  pageNumber = GetAllCommentsDefaultQueryValues.DEFAULT_PAGE_NUMBER,
}: Options): Promise<APIResponse<IComment[]>> => {
  return (
    await fetch(
      `${process.env.NEXT_PUBLIC_API}/comments?pageSize=${pageSize}&pageNumber=${pageNumber}`
    )
  ).json();
};
