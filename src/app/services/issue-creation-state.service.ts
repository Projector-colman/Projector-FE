import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueCreationStateService {
  issueSubject = new BehaviorSubject(""); 
  constructor() {}

  newIssue() {
    this.issueSubject.next("");
  }
}
