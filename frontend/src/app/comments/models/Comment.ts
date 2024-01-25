import { User } from '@/app/session/models/User';

export interface CommentRequestModel {
  text: string;
  userId: string;
}

export interface IComment {
  id: number;
  text: string;
  user: User;
  createdDate: Date;
}
