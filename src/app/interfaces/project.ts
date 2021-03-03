import { Issue } from './issue';
import { User } from './user';

export interface Project {
  projectName: string;
  projectIcon: string;
  owner: User;
  color: string;
  issues: Issue[];
}
