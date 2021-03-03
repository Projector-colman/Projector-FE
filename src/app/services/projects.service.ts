import { Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects = this.usersService.currentConnectedUser.userProjects;

  constructor(private usersService: UsersService) {}

  getProjects() {
    return this.projects;
  }

  getProject(name: string): Project {
    return this.projects.find(
      (project: Project) => project.projectName == name
    );
  }
}
