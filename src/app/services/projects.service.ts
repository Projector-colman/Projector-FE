import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { beAddress } from '../environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[];

  constructor(
    private usersService: UsersService,
    private httpClient: HttpClient
  ) {}

  getAllProjects() {
    const userId = localStorage.getItem('id');
    return this.httpClient.get(beAddress + `api/users/${userId}/projects`);
  }

  getOwnerProjects() {
    return this.httpClient.get(beAddress + 'api/projects/owner');
  }

  createProject(name: string, key: string) {
    return this.httpClient.post(beAddress + 'api/projects', {
      name: name,
      key: key,
    });
  }

  getProject(filters: any): Observable<any> {
    let params = new HttpParams();
    const keys = Object.keys(filters);

    keys.forEach((key) => {
      params = params.append(key, filters[key]);
    });

    return this.httpClient.get(beAddress + 'api/projects', { params: params });
  }

  getProjectUsers(id: number) {
    return this.httpClient.get(beAddress + `api/projects/${id}/users`);
  }

  getProjectIssues(id: number, sprintStatus?) {
    let params = new HttpParams();

    if(sprintStatus) {
      params = params.append('status', sprintStatus);
    }

    return this.httpClient.get(beAddress + `api/projects/${id}/issues`, { params: params });
  }

  addUserToProject(projID, userID) {
    return this.httpClient.post(beAddress + `api/projects/${projID}/users`, {
      userId: userID,
    });
  }

  removeUserFromProject(projID, userID) {
    return this.httpClient.delete(
      beAddress + `api/projects/${projID}/users/${userID}`
    );
  }

  deleteProject(projID) {
    return this.httpClient.delete(beAddress + `api/projects/${projID}`);
  }

  planSprintByProject(
    projID,
    usersStoryPoints: { user: User; storyPoints: number }[]
  ) {
    return this.httpClient.post(beAddress + 'api/sprints/plan', {
      projectId: projID,
      usersStoryPoints: usersStoryPoints,
    });
  }
}
