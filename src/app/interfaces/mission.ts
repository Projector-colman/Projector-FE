import { MissionStatus } from 'src/app/enum/missionStatus.enum';
import { MissionLocation } from '../enum/missionLocation.enum';
import { MissionTimePlan } from './mission-time-plan';

export interface Mission {
  id: number;
  number: string;
  name: string;
  status: MissionStatus;
  location: MissionLocation;
  time: MissionTimePlan;
}
