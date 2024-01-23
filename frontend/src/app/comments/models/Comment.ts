import { User } from '@/app/session/models/User';

export interface CommentRequestModel {
  text: string;
  userId: string;
}

export interface IComment {
  id: string;
  text: string;
  user: User;
}
