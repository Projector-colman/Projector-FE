import { Injectable } from '@angular/core';
import { ProjectsService } from './projects.service';
import { UsersService } from './users.service';
import { beAddress } from '../environment';
import { Issue } from 'src/app/interfaces/issue';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private projectsService: ProjectsService, private usersService: UsersService, private httpClient: HttpClient) { }
  
  getCurrentUserAssignedIssues() : Observable<Issue[]> {
    var currUser = this.usersService.getCurrConnectedUser();
    return this.httpClient.get<Issue[]>(`${beAddress}api/users/${currUser.id}/issues/assignee`);
  }
}
