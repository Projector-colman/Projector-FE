import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Issue } from '../interfaces/issue';
import { HttpClient } from '@angular/common/http';
import { beAddress } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class issuesService {
  constructor(private http: HttpClient) {}

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
    return this.http.get(beAddress + 'api/issues', filters);
  }
}