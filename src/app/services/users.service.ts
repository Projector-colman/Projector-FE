import { Injectable } from '@angular/core';
import { TimeType } from '../enum/timeType.enum';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentConnectedUser: User;
  users: User[] = [
    {
      id: 1,
      fullName: 'ITAMAR MAROM',
      imageSrc:
        'https://www.theglobeandmail.com/resizer/a1tsouRgbsPGVK8OvdFYJqxNhEo=/4415x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/5HSZVXDII5BRRHH4S6KE4WZ7RE.jpg',
      userName: 'Best-user',
      email: 'itsamail@gmail.com',
      password: 'Aa123456',
      userProjects: [
        {
          projectName: 'PROJECTOR',
          projectIcon: 'fas fa-projector',
          color: '#eb4034',
          missions: [
            {
              id: 1,
              number: '1',
              name: 'Create a mock',
              status: 5,
              location: 1,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 2,
              number: '2',
              name: 'Create backlog',
              status: 5,
              location: 2,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 3,
              number: '3',
              name: 'Create a mock',
              status: 2,
              location: 1,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 4,
              number: '4',
              name: 'Create backlog',
              status: 5,
              location: 2,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 5,
              number: '5',
              name: 'Create a mock',
              status: 5,
              location: 3,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 6,
              number: '6',
              name: 'Create backlog',
              status: 2,
              location: 1,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 7,
              number: '7',
              name: 'Create a mock',
              status: 2,
              location: 1,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 8,
              number: '8',
              name: 'Create backlog',
              status: 5,
              location: 3,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 9,
              number: '9',
              name: 'Create a mock',
              status: 3,
              location: 1,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
            {
              id: 10,
              number: '10',
              name: 'Create backlog',
              status: 5,
              location: 2,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
          ],
        },
        {
          projectName: 'PROJECTOR-A',
          projectIcon: 'fas fa-projector',
          color: '#a2d1f2',
          missions: [
            {
              id: 2,
              number: '2',
              name: 'Create backlog',
              status: 2,
              location: 2,
              time: {
                number: 2,
                type: TimeType.Hours,
              },
            },
          ],
        },
      ],
    },
  ];

  constructor() {
    this.currentConnectedUser = this.users[0];
  }

  getUsers() {
    return this.users;
  }

  getUser(id: number): User {
    return this.users.find((user: User) => user.id == id);
  }

  updateUser(user: User) {
    return undefined;
  }

  getCurrConnectedUser(): User {
    return this.currentConnectedUser;
  }
}
