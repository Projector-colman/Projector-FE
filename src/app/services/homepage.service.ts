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
    return this.http.get(beAddress + 'api/issues');
    /*return this.projectsService.getProject('cookbook').issues
      .filter(issue => issue.assignee.id === this.usersService.getCurrConnectedUser().id)
      .filter(issue => issue.status !== IssueStatus.Done)
      .sort(issue => issue.priority);*/
  }
}
