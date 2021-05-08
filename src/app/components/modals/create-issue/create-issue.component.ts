import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../../../services/projects.service';
import { IssuesService } from '../../../services/issues.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-create-issue',
  templateUrl: './create-issue.component.html',
  styleUrls: ['./create-issue.component.scss'],
})
export class CreateIssueComponent implements OnInit {
  issueForm: FormGroup;
  isFormValid = false;
  submitted = false;

  allProjects;
  projectUsers;
  projectEpics;
  projectIssues;

  issueTypes = ['Story', 'Epic'];
  priorityTypes = [{name: 'lowest', id: 1}, {name: 'low', id: 2}, {name: 'medium', id: 3}, {name: 'high', id: 4}, {name: 'highest', id: 5}];

  selectedProject: Project;
  selectedIssueType = this.issueTypes[0];
  selectedPriority;
  selectedAssignee;
  selectedEpic;
  selectedBlockedIssue = undefined;

  errorTypes = {storyPoints : false, priority : false, epic : false, reporter: false, assignee: false};

  constructor(
    private projectService: ProjectsService,
    private issuesService: IssuesService,
    private formBuilder: FormBuilder,
    private dialogRef: MatDialogRef<CreateIssueComponent>
  ) {}

  ngOnInit(): void {
    this.allProjects = this.projectService.getOwnerProjects();
    this.issueForm = this.formBuilder.group({
      project: [this.selectedProject, Validators.required],
      issueType: [this.selectedIssueType, Validators.required],
      name: ['', Validators.required, Validators.minLength(2), Validators.maxLength(255)],
      reporter: [''],
      description: ['', Validators.required],
      priority: this.selectedPriority,
      storyPoints: [0],
      assignee: [null],
      epicLink: this.selectedEpic,
      blockedBy: this.selectedBlockedIssue
    });
  }

  // form helper
  get f() {
    return this.issueForm.controls;
  }

  changeProject(e) {
    // extract proper project name from event
    const projID = e.target.value.substring(e.target.value.indexOf(' ') + 1);

    this.projectService.getProject({ id: projID }).subscribe((proj) => {
      this.selectedProject = proj;
    });

    //this.selectedProject = +e.target.value.substring(e.target.value.indexOf(' ') + 1);
    this.projectUsers = this.projectService.getProjectUsers(projID);
    this.projectEpics = this.issuesService.getEpics({});
    this.projectIssues = this.issuesService.getProjectIssues(projID);
  }

  changeIssueType(e) {
    // extract proper project name from event
    this.selectedIssueType = e.target.value.substring(
      e.target.value.indexOf(' ') + 1
    );
  }

  changePriority(e) {
    // extract proper project name from event
    this.selectedPriority = e.target.value.substring(
      e.target.value.indexOf(' ') + 1
    );
  }

  changeAssignee(e) {
    // extract proper project name from event
    this.selectedAssignee = e.target.value.substring(
      e.target.value.indexOf(' ') + 1
    );
  }

  changeEpic(e) {
    // extract proper project name from event
    this.selectedEpic = e.target.value.substring(
      e.target.value.indexOf(' ') + 1
    );
  }

  changeBlocked(e) {
    // extract proper project name from event
    this.selectedEpic = e.target.value.substring(e.target.value.indexOf(' ') + 1);
  }

  onSubmit() {
    this.isFormValid = true;
    this.submitted = true;
    this.resetErrors();

    if (this.issueForm.invalid) {
      this.isFormValid = false;
      return;
    }

    if (this.selectedIssueType === "Story") {
      if (!this.f.priority.value) {
        this.isFormValid = false;
        this.errorTypes.priority = true;
      }
      if (!this.f.epicLink.value) {
        this.isFormValid = false;
        this.errorTypes.epic = true;
      }
      if (+this.f.storyPoints.value <= 0) {
        this.isFormValid = false;
        this.errorTypes.storyPoints = true;
      }
      if(!this.f.reporter.value) {
        this.isFormValid = false;
        this.errorTypes.reporter = true;
      }
      if(!this.f.assignee.value) {
        this.isFormValid = false;
        this.errorTypes.assignee = true;
      }

      const data = {
        name: this.f.name.value,
        epic: this.f.epicLink.value,
        description: this.f.description.value,
        asignee: this.f.assignee.value,
        storyPoints: +this.f.storyPoints.value,
        priority: this.f.priority.value,
        sprint: undefined,
        status: 'to-do',
        blockedBy: this.f.blocked.value
      }

      this.issuesService.createStory(data).subscribe(response => {
        this.dialogRef.close();
      }, 
      error => {
        this.isFormValid = false;
        console.error(error)
      });
    }

    if (this.selectedIssueType === 'Epic') {
      const data = {
        name: this.f.name.value,
        project: this.f.project.value,
        description: this.f.description.value,
        asignee: this.f.assignee.value};

      this.issuesService.createEpic(data).subscribe(response => {
        this.dialogRef.close();
      }, 
      error => {
        this.isFormValid = false;
        console.log('error in create epic')
      });
    }
  }

  resetErrors() {
    let errors = Object.keys(this.errorTypes);
    errors.forEach(error => {
      this.errorTypes[error] = false;
    })
  }
}
