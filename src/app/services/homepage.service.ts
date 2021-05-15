import { Injectable } from '@angular/core';
import { beAddress } from '../environment';
import { Issue } from 'src/app/interfaces/issue';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class HomepageService {
  constructor(private authService: AuthService, private httpClient: HttpClient) { }
  
  getCurrentUserAssignedIssues() : Observable<Issue[]> {
    var userID = this.authService.getUserID();
    return this.httpClient.get<Issue[]>(`${beAddress}api/users/${userID}/issues/assignee`);
  }
}
