import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-issue-preview',
  templateUrl: './issue-preview.component.html',
  styleUrls: ['./issue-preview.component.scss'],
})
export class IssuePreviewComponent implements OnInit {
  @Input() issue: Issue;
  constructor() {}

  ngOnInit(): void {}
}
