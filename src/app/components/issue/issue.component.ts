import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue;
  constructor() {}

  ngOnInit(): void {}
}
