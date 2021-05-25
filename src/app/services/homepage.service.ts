import { Injectable } from '@angular/core';
import { beAddress } from '../environment';
import { Issue } from 'src/app/interfaces/issue';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Graph1Result } from '../interfaces/graph1result';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private authService: AuthService, private httpClient: HttpClient) { }
  
  getCurrentUserAssignedIssues() : Observable<Issue[]> {
    var userID = this.authService.getUserID();
    return this.httpClient.get<Issue[]>(`${beAddress}api/users/${userID}/issues/assignee`);
  }

  getActiveSprintChart(projectId, userId) : Observable<Graph1Result> {
    const params = new HttpParams()
      .set('project', projectId)
      .set('user', userId);
    return this.httpClient.get<Graph1Result>(`${beAddress}api/sprints/graph1`, {params});
  }
}
