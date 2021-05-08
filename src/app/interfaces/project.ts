import { Issue } from './issue';
import { User } from './user';

export interface Project {
  id?: number;
  projectName?: string;
  projectIcon?: string;
  owner?: User;
  icon?: string;
  color?: string;
  key?: string;
}
