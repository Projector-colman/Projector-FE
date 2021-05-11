import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { beAddress } from '../environment';
import { Base } from 'src/app/interfaces/Base';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  getUserProjects(userId) : Observable<Base[]> {
    return this.httpClient.get<Base[]>(`${beAddress}api/users/${userId}/projects`);
  }
}
