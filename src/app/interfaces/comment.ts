import { User } from './user';

export interface Comment {
  id?: string;
  description: string;
  writer: number;
  issue: number;
  time: Date;
}
