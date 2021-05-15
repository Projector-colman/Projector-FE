import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-main-issue',
  templateUrl: './main-issue.component.html',
  styleUrls: ['./main-issue.component.scss']
})
export class MainIssueComponent implements OnInit {
  @Input() issue: Issue;
  @Input() projectKey: string | 'prj';
  @Output() issueToOpen = new EventEmitter<Issue>();
  constructor() { }

  ngOnInit(): void {
  }
  clicked() {
    this.issueToOpen.emit(this.issue);
  }
}