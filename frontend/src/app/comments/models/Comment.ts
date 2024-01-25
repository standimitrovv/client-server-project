import { User } from '@/app/session/models/User';

export interface IComment {
  id: number;
  text: string;
  user: User;
  createdDate: Date;
}
