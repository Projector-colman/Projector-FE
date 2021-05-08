import { Injectable } from '@angular/core';
import { IssueStatus } from '../enum/issueStatus.enum';
import { ProjectsService } from './projects.service';
import { UsersService } from './users.service';
import { HttpClient } from '@angular/common/http';
import { beAddress } from '../environment';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private projectsService: ProjectsService, private usersService: UsersService, private http: HttpClient) { }
  getCurrentUserAssignedIssues() {
    let userId = localStorage.getItem('id')
    return this.http.get(beAddress + `api/users/${userId}/issues/assignee`);
  }
}
