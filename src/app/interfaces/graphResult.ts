import { IssueLocation } from '../enum/issueLocation.enum';
import { Issue } from './issue';

export interface GraphResult {
  startTime: any;
  endTime: any;
  storyPoints: any;
  issues: Issue[];
}
