import { Issue } from './issue';
import { User } from './user';

export interface Project {
  id?: string;
  projectName?: string;
  projectIcon?: string;
  owner?: User;
  color?: string;
  issues?: Issue[];
  key?: string;
}
