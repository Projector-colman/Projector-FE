import { IssueLocation } from '../enum/issueLocation.enum';
import { Issue } from './issue';

export interface Graph1Result {
  startTime: any;
  endTime: any;
  storyPoints: any;
  issues: Issue[];
}
