import { Component, OnInit } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Router } from '@angular/router';
import { IssueLocation } from 'src/app/enum/issueLocation.enum';
import { issuesService } from 'src/app/services/issues.service';
import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { Issue } from 'src/app/interfaces/issue';
import { Project } from 'src/app/interfaces/project';
import { ProjectsService } from 'src/app/services/projects.service';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss'],
})
export class BacklogComponent implements OnInit {
  projectName: string;
  currProject: Project;

  constructor(
    public router: Router,
    private sidenavUpdateService: SidenavUpdateService,
    private projectsService: ProjectsService,
    private issuesService: issuesService
  ) {}

  ngOnInit(): void {
    this.projectName = this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('backlog');
    this.sidenavUpdateService.changeProject(this.projectName);
    this.projectsService.getProjects().subscribe((projects: Project[]) => {
      this.currProject = projects.find(
        (project: Project) => project.projectName == this.projectName
      );
    });
  }

  getStatusIssues(status: number): Issue[] {
    return this.currProject.issues.filter(
      (issue: Issue) => issue.location == status
    );
  }

  public get issuesLocation(): typeof IssueLocation {
    return IssueLocation;
  }

  drop(event: CdkDragDrop<Issue[]>) {
    if (event.container.id !== event.previousContainer.id) {
      let list: Issue[];
      switch (event.previousContainer.id) {
        case 'CurrSprint': {
          list = this.getStatusIssues(this.issuesLocation.CurrentSprint);
          break;
        }
        case 'PlannedStrint': {
          list = this.getStatusIssues(this.issuesLocation.PlannedSprint);
          break;
        }
        case 'Backlog': {
          list = this.getStatusIssues(this.issuesLocation.Backlog);
          break;
        }
        default: {
          break;
        }
      }

      switch (event.container.id) {
        case 'CurrSprint': {
          list[
            event.previousIndex
          ].location = this.issuesLocation.CurrentSprint;
          list[event.previousIndex].status = IssueStatus.ToDo;
          this.issuesService
            .updateIssue(list[event.previousIndex])
            .toPromise()
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        case 'PlannedStrint': {
          list[
            event.previousIndex
          ].location = this.issuesLocation.PlannedSprint;
          list[event.previousIndex].status = IssueStatus.None;
          this.issuesService
            .updateIssue(list[event.previousIndex])
            .toPromise()
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        case 'Backlog': {
          list[event.previousIndex].location = this.issuesLocation.Backlog;
          list[event.previousIndex].status = IssueStatus.None;
          this.issuesService
            .updateIssue(list[event.previousIndex])
            .toPromise()
            .then((data) => {
              console.log(data);
            })
            .catch((error) => {
              console.log(error);
            });
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
