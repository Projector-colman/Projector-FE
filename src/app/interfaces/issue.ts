import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { IssueLocation } from '../enum/issueLocation.enum';
import { IssueTimePlan } from './issue-time-plan';
import { User } from './user';

export interface Issue {
  id: number;
  number: string;
  name: string;
  description: string;
  reporter: User;
  assignee: User;
  priority: number;
  epikLink: string;
  status: IssueStatus;
  location: IssueLocation;
  time: IssueTimePlan;
}
