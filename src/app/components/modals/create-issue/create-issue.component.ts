import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { issuesService } from '../../../services/issues.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss']
})
export class CreateIssueComponent implements OnInit {
  issueForm: FormGroup;
  isFormValid = false;
  submitted = false;

  allProjects;
  issueTypes = ['Story', 'Epic'];
  priorityTypes = ['highest', 'high', 'medium', 'low', 'lowest'];

  selectedProject;
  selectedIssueType = this.issueTypes[0];
  selectedPriority;
  
  constructor(private projectService: ProjectsService,
              private issuesService: issuesService,
              private formBuilder: FormBuilder,) { }

  ngOnInit(): void {
    this.allProjects = this.projectService.getOwnerProjects();
    this.issueForm = this.formBuilder.group({
      project: [this.selectedProject, Validators.required],
      issueType: [this.selectedIssueType, Validators.required],
      name: ['', Validators.required],
      reporter: ['', Validators.required],
      description: [''],
      priority: this.selectedPriority,
      assignee: [''],
      epicLink: ['']
    });
  }

  changeProject(e) {
    // extract proper project name from event
    this.selectedProject = e.target.value.substring(e.target.value.indexOf(' ') + 1);
  }

  changeIssueType(e) {
    // extract proper project name from event
    this.selectedIssueType = e.target.value.substring(e.target.value.indexOf(' ') + 1);
  }

  changePriority(e) {
    // extract proper project name from event
    this.selectedPriority = e.target.value.substring(e.target.value.indexOf(' ') + 1);
  }

  onSubmit() {
    this.isFormValid = true;
    this.submitted = true;

    switch(this.selectedIssueType) {
      case this.issueTypes[0]: {
        if (!this.issueForm.value.priority || !this.issueForm.value.epicLink) {
          this.isFormValid = false;
        } else {

        }
       break; 
      }
      case this.issueTypes[1]: {
        break;
      }
      default: {
        console.log('Unknown Error');
        this.isFormValid = false;
        break;
      }
    }
  }
}
