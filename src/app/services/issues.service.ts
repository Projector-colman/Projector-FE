import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../interfaces/issue';
import { HttpClient, HttpParams } from '@angular/common/http';
import { beAddress } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class IssuesService {
  constructor(private httpClient: HttpClient) {}

  updateIssue(issue: Issue): Observable<string> {
    // return this.http
    //   .post<Issue>(
    //     'http://34.66.166.236/:3000/api/issues/update',
    //     issue
    //   );
    return new Observable<string>((subscriber) =>
      subscriber.next('update succeed')
    );
  }

  getIssues(filters): Observable<any> {
    let params = new HttpParams();
    const keys = Object.keys(filters);
    
    keys.forEach(key => {
      params.set(key, filters[key]);  
    });

    return this.httpClient.get(beAddress + 'api/issues', {params: params});
  }

  getProjectIssues(id: number): Observable<any> {
    return this.httpClient.get(beAddress + `api/projects/${id}/issues`);
  }

  getEpics(filters) {
    let params = new HttpParams();
    const keys = Object.keys(filters);
    
    keys.forEach(key => {
      params = params.append(key, filters[key]);  
    });

    return this.httpClient.get(beAddress + 'api/epics', {params: params});
  }

  createStory(issueData) {
    return this.httpClient.post(beAddress + 'api/issues', issueData);
  }

  createEpic(issueData) {
    return this.httpClient.post(beAddress + 'api/epics', issueData);
  }
}