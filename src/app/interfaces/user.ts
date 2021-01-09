import { Project } from './project';

export interface User {
  fullName: string;
  imageSrc: string;
  userName: string;
  email: string;
  password: string;
  userProjects: Project[];
}
