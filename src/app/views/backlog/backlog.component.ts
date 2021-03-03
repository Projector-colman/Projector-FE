import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IssueLocation } from 'src/app/enum/issueLocation.enum';
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

  getStatisIssues(status: number): Issue[] {
    return this.currProject.issues.filter(
      (mission: Issue) => mission.location == status
    );
  }

  public get issuesLocation(): typeof IssueLocation {
    return IssueLocation;
  }
}
