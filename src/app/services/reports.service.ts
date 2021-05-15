import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { beAddress } from '../environment';
import { Base } from 'src/app/interfaces/Base';
import { Sprint } from 'src/app/interfaces/sprint';
import { Issue } from 'src/app/interfaces/issue';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  getUserProjects(userId) : Observable<Base[]> {
    return this.httpClient.get<Base[]>(`${beAddress}api/users/${userId}/projects`);
  }

  getProjectUsers(projectId): Observable<Base[]> {
    return this.httpClient.get<Base[]>(`${beAddress}api/projects/${projectId}/users`);
  }

  getProjectSptrints(projectId) : Observable<Sprint[]> {
    return this.httpClient.get<Sprint[]>(`${beAddress}api/projects/${projectId}/sprints`);
  }

  getProjectIssues(projectId) : Observable<Issue[]> {
    return this.httpClient.get<Issue[]>(`${beAddress}api/projects/${projectId}/issues`);
  }
}
