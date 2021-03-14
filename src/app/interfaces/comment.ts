import { User } from './user';

export interface Comment {
  id?: string;
  projectId: string;
  reporter: User;
  date: Date;
  content: string;
}
