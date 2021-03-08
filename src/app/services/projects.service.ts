import { Injectable } from '@angular/core';
import { TimeType } from '../enum/timeType.enum';
import { Project } from '../interfaces/project';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[];

  constructor(private usersService: UsersService) {
    this.projects = [
      {
        projectName: 'cookbook',
        projectIcon: 'fas fa-projector',
        owner: this.usersService.getCurrConnectedUser(),
        color: '#eb4034',
        issues: [
          {
            id: 1,
            number: '1',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 5,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 2,
            number: '2',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 5,
            location: 2,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 3,
            number: '3',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 2,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 4,
            number: '4',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 5,
            location: 2,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 5,
            number: '5',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 5,
            location: 3,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 6,
            number: '6',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 2,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 7,
            number: '7',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 2,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 8,
            number: '8',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 5,
            location: 3,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 9,
            number: '9',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 3,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 10,
            number: '10',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 5,
            location: 2,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
        ],
      },
      {
        projectName: 'PROJECTOR-A',
        projectIcon: 'fas fa-projector',
        owner: this.usersService.getCurrConnectedUser(),
        color: '#a2d1f2',
        issues: [
          {
            id: 2,
            number: '2',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: '',
            status: 2,
            location: 2,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
        ],
      },
    ];
  }

  getProjects() {
    return this.projects;
  }

  getProject(name: string): Project {
    return this.projects.find(
      (project: Project) => project.projectName == name
    );
  }
}
