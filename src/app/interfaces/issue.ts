import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { IssueLocation } from '../enum/issueLocation.enum';
import { IssueTimePlan } from './issue-time-plan';
import { Comment } from './comment';
import { User } from './user';

export interface Issue {
  id: number;
  projectId: string;
  number: string;
  name: string;
  description: string;
  reporter: User;
  asignee: User;
  priority: number;
  epikLink: string;
  status: IssueStatus;
  location: IssueLocation;
  time: IssueTimePlan;
}
