import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  allProjects = ['projector', 'cookbook'];
  issueTypes = ['Story', 'Epic'];
  priorityTypes = ['highest', 'high', 'medium', 'low', 'lowest'];
  name = '';
  reported = '';
  descriptions = '';
  assignee = ['or fridman', 'itamar marom'];

  selectedProject;
  selectedIssueType;
  selectedPriority;
  
  constructor() { }

  ngOnInit(): void {
  }

}
