import { Injectable } from '@angular/core';
import { TimeType } from '../enum/timeType.enum';
import { User } from '../interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { beAddress } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  currentConnectedUser: User;
  users: User[] = [
    {
      id: 1,
      name: 'ITAMAR MAROM',
      image:
        'https://www.theglobeandmail.com/resizer/a1tsouRgbsPGVK8OvdFYJqxNhEo=/4415x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/5HSZVXDII5BRRHH4S6KE4WZ7RE.jpg',
      email: 'itsamail@gmail.com',
      password: 'Aa123456',
    },
  ];

  constructor(private httpClient: HttpClient) {
    this.currentConnectedUser = this.users[0];
  }

  getUsers() {
    return this.httpClient.get(beAddress + `api/users`);
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
