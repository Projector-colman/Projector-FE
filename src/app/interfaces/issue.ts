import { IssueLocation } from '../enum/issueLocation.enum';

export interface Issue {
  id?: number;
  name?: string;
  description?: string;
  epic?: number;
  reporter?: number;
  asignee?: number;
  assignee?: { id: number; name: string, image: any };
  storyPoints?: number;
  priority?: number;
  sprintStatus?: IssueLocation;
  sprint?: number;
  status?: any;
  createdAt?: any;
  updatedAt?: any;
  blockers? : any[];
  blocked? : any[];
  Epic? : any;
  project: number;
}
