import { Issue } from './issue';

export interface Project {
  projectName: string;
  projectIcon: string;
  color: string;
  issues: Issue[];
}
