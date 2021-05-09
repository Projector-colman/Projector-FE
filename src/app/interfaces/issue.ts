import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { IssueLocation } from '../enum/issueLocation.enum';

export interface Issue {
  id?: number;
  name?: string;
  description?: string;
  epic?: number;
  reporter?: number;
  asignee?: number;
  storyPoints?: number;
  priority?: number;
  sprint?: IssueLocation;
  status?: IssueStatus;
  createdAt?: any;
}
