import { IssueLocation } from '../enum/issueLocation.enum';

export interface Issue {
  id?: number;
  name?: string;
  description?: string;
  epic?: number;
  reporter?: number;
  asignee?: { id: number, name: string};
  storyPoints?: number;
  priority?: number;
  sprint?: IssueLocation;
  status?: any;
  createdAt?: any;
}
