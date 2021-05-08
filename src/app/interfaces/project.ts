import { Issue } from './issue';
import { User } from './user';

export interface Project {
  id?: number;
  name: string;
  icon?: string;
  owner: number;
  color?: string;
  key: string;
}
