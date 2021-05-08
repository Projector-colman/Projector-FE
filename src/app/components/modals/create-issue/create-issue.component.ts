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

  issueTypes = ['Story', 'Epic'];
  priorityTypes = ['lowest', 'low', 'medium', 'high', 'highest'];

  selectedProject: Project;
  selectedIssueType = this.issueTypes[0];
  selectedPriority;
  selectedAssignee;
  selectedEpic;

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
      name: ['', Validators.required],
      reporter: [''],
      description: [''],
      priority: this.selectedPriority,
      storyPoints: [0, Validators.min(1)],
      assignee: [''],
      epicLink: this.selectedEpic,
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

  onSubmit() {
    this.isFormValid = true;
    this.submitted = true;

    if (this.issueForm.invalid) {
      this.isFormValid = false;
      return;
    }

    if (this.selectedIssueType === 'Story') {
      if (
        !this.f.priority.value ||
        !this.f.epicLink.value ||
        !this.f.storyPoints.value ||
        !this.f.reporter.value
      ) {
        this.isFormValid = false;
        return;
      }
      const data = {
        name: this.f.name.value,
        epic: this.f.epicLink.value,
        description: this.f.description.value,
        asignee: this.f.assignee.value,
        storyPoints: +this.f.storyPoints.value,
        priority: this.priorityTypes.indexOf(this.f.priority.value),
        sprint: undefined,
        status: 'to-do',
      };

      this.issuesService.createStory(data).subscribe(
        (response) => {
          this.dialogRef.close();
        },
        (error) => {
          console.error(error);
        }
      );
    }

    if (this.selectedIssueType === 'Epic') {
      const data = {
        name: this.f.name.value,
        project: this.f.project.value,
        description: this.f.description.value,
        asignee: this.f.assignee.value,
      };

      this.issuesService.createEpic(data).subscribe(
        (response) => {
          this.dialogRef.close();
        },
        (error) => {
          console.log('error in create epic');
        }
      );
    }
  }
}
