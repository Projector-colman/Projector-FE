import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';
import { IssuesService } from '../../services/issues.service';
import { ProjectsService } from '../../services/projects.service';
import { Router } from '@angular/router';
import { Project } from 'src/app/interfaces/project';

@Component({
  selector: 'app-project-settings',
  templateUrl: './project-settings.component.html',
  styleUrls: ['./project-settings.component.scss']
})
export class ProjectSettingsComponent implements OnInit {
  project: Project = {};

  constructor(private sidenavUpdateService: SidenavUpdateService,
              private issuesService: IssuesService,
              public projectsService: ProjectsService,
              public router: Router,) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage('projects');
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
    this.sidenavUpdateService.currentProject.subscribe(id => this.project.id = id);
  }

}
