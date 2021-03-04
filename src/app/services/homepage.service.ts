import { Injectable } from '@angular/core';
import { IssueStatus } from '../enum/issueStatus.enum';
import { ProjectsService } from './projects.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private projectsService: ProjectsService, private usersService: UsersService) { }
  getCurrentUserAssignedIssues() {
    return this.projectsService.getProject('cookbook').issues
      .filter(issue => issue.assignee.id === this.usersService.getCurrConnectedUser().id)
      .filter(issue => issue.status !== IssueStatus.Done)
      .sort(issue => issue.priority);
  }
}
