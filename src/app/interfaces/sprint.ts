import { IssueLocation } from "../enum/issueLocation.enum";

export interface Sprint {
    id: number;
    startTime: any;
    endTime: any;
    status: IssueLocation;
    storyPoints: number;
  }
  