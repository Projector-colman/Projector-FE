import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { IssueLocation } from '../enum/issueLocation.enum';
import { IssueTimePlan } from './issue-time-plan';

export interface Issue {
  id: number;
  number: string;
  name: string;
  status: IssueStatus;
  location: IssueLocation;
  time: IssueTimePlan;
}
