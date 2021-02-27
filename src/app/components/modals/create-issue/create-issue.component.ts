import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  allProjects = ['projector', 'cookbook'];
  issueTypes = ['Story', 'Epic'];
  selectedProject;
  selectedIssueType;
  email;
  constructor() { }

  ngOnInit(): void {
  }

}
