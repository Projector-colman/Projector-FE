import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IssueCreationStateService {
  issueSubject = new BehaviorSubject("");
  sprintSubject = new BehaviorSubject(""); 
  constructor() {}

  newIssue() {
    this.issueSubject.next("");
  }

  newSprint() {
    this.sprintSubject.next("")
  }
}
