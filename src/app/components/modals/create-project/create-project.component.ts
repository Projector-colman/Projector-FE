import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent implements OnInit {
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
