import { Mission } from './mission';

export interface Project {
  projectName: string;
  projectIcon: string;
  color: string;
  missions: Mission[];
}
