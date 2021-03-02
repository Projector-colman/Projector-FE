import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentConnectedUser: User;
  users = [
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
          projectName: 'PROJECTOR(PRJ)',
          projectIcon: 'fas fa-projector',
          color: '#eb4034',
        },
        {
          projectName: 'PROJECTOR-A',
          projectIcon: 'fas fa-projector',
          color: '#a2d1f2',
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

  getCurrConnectedUser(user: User): User {
    return this.currentConnectedUser;
  }
}
