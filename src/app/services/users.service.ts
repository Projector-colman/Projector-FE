import { Injectable } from '@angular/core';
import { TimeType } from '../enum/timeType.enum';
import { User } from '../interfaces/user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { beAddress } from '../environment';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private foundUser = false;
  userSubject = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {
  }

  getUsers() {
    return this.httpClient.get(beAddress + `api/users`);
  }

  getMyUser() {
    return this.httpClient.get(beAddress + `api/users/me`);
  }

  getUserProjects(id) {
    return this.httpClient.get(beAddress + `api/users/${id}/projects`);
  }

  updateUser(user: User) {
    return undefined;
  }

  getCurrConnectedUser() {
    // If first time then query for user
    if(!this.foundUser) {
      this.foundUser = true;
      this.httpClient.get(beAddress + `api/users/me`).subscribe(user => {
        this.userSubject.next(user);
      });
    }
    return this.userSubject;
  }
}
