import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueLocation } from 'src/app/enum/issueLocation.enum';
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
    private projectsService: ProjectsService
  ) {}

  ngOnInit(): void {
    this.projectName = this.router.url.split('/')[2];
    this.sidenavUpdateService.changeMessage('backlog');
    this.sidenavUpdateService.changeProject(this.projectName);
    this.currProject = this.projectsService.getProject(this.projectName);
  }

  getStatusIssues(status: number): Issue[] {
    return this.currProject.issues.filter(
      (mission: Issue) => mission.location == status
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
          break;
        }
        case 'PlannedStrint': {
          list[
            event.previousIndex
          ].location = this.issuesLocation.PlannedSprint;
          list[event.previousIndex].status = IssueStatus.None;
          break;
        }
        case 'Backlog': {
          list[event.previousIndex].location = this.issuesLocation.Backlog;
          list[event.previousIndex].status = IssueStatus.None;
          break;
        }
        default: {
          break;
        }
      }
    }
  }
}
