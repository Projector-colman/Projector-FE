import { Injectable } from '@angular/core';
import { TimeType } from '../enum/timeType.enum';
import { Project } from '../interfaces/project';
import { UsersService } from './users.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { beAddress } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  projects: Project[];

  constructor(private usersService: UsersService,
              private httpClient: HttpClient) {
    this.projects = [
      {
        id: 'cookbook',
        projectName: 'cookbook',
        projectIcon: 'fas fa-projector',
        owner: this.usersService.getCurrConnectedUser(),
        color: '#eb4034',
        issues: [
          {
            id: 1,
            projectId: 'cookbook',
            number: '1',
            name: 'Create a mock',
            description: 'epik-link',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 1,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 2,
            projectId: 'cookbook',
            number: '2',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 1,
            location: 2,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 3,
            projectId: 'cookbook',
            number: '3',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 2,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 4,
            projectId: 'cookbook',
            number: '4',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 2,
            location: 2,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 5,
            projectId: 'cookbook',
            number: '5',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 2,
            location: 3,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 6,
            projectId: 'cookbook',
            number: '6',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 2,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 7,
            projectId: 'cookbook',
            number: '7',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 2,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 8,
            projectId: 'cookbook',
            number: '8',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 1,
            location: 3,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 9,
            projectId: 'cookbook',
            number: '9',
            name: 'Create a mock',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 3,
            location: 1,
            time: {
              number: 2,
              type: TimeType.Hours,
            },
          },
          {
            id: 10,
            projectId: 'cookbook',
            number: '10',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
            status: 3,
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
            projectId: 'cookbook',
            number: '2',
            name: 'Create backlog',
            description: '',
            reporter: this.usersService.getCurrConnectedUser(),
            assignee: this.usersService.getCurrConnectedUser(),
            priority: 1,
            epikLink: 'epik-link',
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

  getProjects(): Observable<Project[]> {
    return new Observable<Project[]>((subscriber) =>
      subscriber.next(this.projects)
    );
  }

  getAllProjects() {
    const userId = localStorage.getItem('id');
    return this.httpClient.get(beAddress + `api/users/${userId}/projects`);
  }

  getOwnerProjects() {
    return this.httpClient.get(beAddress + 'api/projects/owner');
  }

  createProject(name: string) {
    return this.httpClient.post(beAddress + 'api/projects', {name: name});
  }

  getProjectByName(name: string) {
    let params = new HttpParams().set('name', name);
    return this.httpClient.get(beAddress + 'api/projects', {params: params});
  }

  getProjectUsers(id: number) {
    return this.httpClient.get(beAddress + `api/projects/${id}/users`);
  }
}
