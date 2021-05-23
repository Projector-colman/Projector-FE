import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { beAddress } from '../environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private foundUser = false;
  userSubject = new BehaviorSubject<User>(null);

  constructor(private httpClient: HttpClient) {}

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
    return this.httpClient.put(beAddress + `api/user/${user.id}`, user);
  }

  getCurrConnectedUser() {
    // If first time then query for user
    if (!this.foundUser) {
      this.foundUser = true;
      this.httpClient.get(beAddress + `api/users/me`).subscribe((user) => {
        this.userSubject.next(user);
      });
    }
    return this.userSubject;
  }
}
