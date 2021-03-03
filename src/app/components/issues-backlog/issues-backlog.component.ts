import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-issues-backlog',
  templateUrl: './issues-backlog.component.html',
  styleUrls: ['./issues-backlog.component.scss'],
})
export class IssuesBacklogComponent implements OnInit {
  @Input() header: string;
  @Input() issues: Issue[];
  @Input() showPlanSprintBtn: boolean;
  constructor() {
    this.showPlanSprintBtn = false;
  }

  ngOnInit(): void {}
}
