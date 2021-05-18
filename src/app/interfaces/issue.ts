import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { IssueLocation } from '../enum/issueLocation.enum';

export interface Issue {
  id?: number;
  name?: string;
  description?: string;
  epic?: number;
  reporter?: number;
  asignee?: number | string;
  storyPoints?: number;
  priority?: number;
  sprint?: number;
  status?: any;
  createdAt?: any;
  updatedAt?: any;
}
