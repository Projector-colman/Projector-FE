import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IssueStatus } from '../enum/issueStatus.enum';
import { Comment } from '../interfaces/comment';
import { Project } from '../interfaces/project';
import { ProjectsService } from './projects.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: Comment[] = [
    {
      id: 'abc',
      projectId: 'cookbook',
      reporter: this.usersService.getCurrConnectedUser(),
      date: new Date(),
      content: 'Please move to Backlog',
    },
    {
      id: 'abch',
      projectId: 'cookbook',
      reporter: this.usersService.getCurrConnectedUser(),
      date: new Date(),
      content: 'Please move to Backlog',
    },
    {
      id: 'abc',
      projectId: 'cookbook',
      reporter: this.usersService.getCurrConnectedUser(),
      date: new Date(),
      content: 'Please move to Backlog',
    },
    {
      id: 'abcg',
      projectId: 'cookbook',
      reporter: this.usersService.getCurrConnectedUser(),
      date: new Date(),
      content: 'Please move to Backlog',
    },

    {
      id: 'abcf',
      projectId: 'cookbook',
      reporter: this.usersService.getCurrConnectedUser(),
      date: new Date(),
      content: 'Please move to Backlog',
    },
    {
      id: 'abce',
      projectId: 'cookbook',
      reporter: this.usersService.getCurrConnectedUser(),
      date: new Date(),
      content: 'Please move to Backlog',
    },
    {
      id: 'abcd',
      projectId: 'cookbook',
      reporter: this.usersService.getCurrConnectedUser(),
      date: new Date(),
      content: 'Please move to Backlog',
    },
  ];
  constructor(
    private projectsService: ProjectsService,
    private usersService: UsersService
  ) {}

  getCommentsByProjectId(projectId: string): Comment[] {
    return this.comments.filter(
      (comment: Comment) => comment.projectId === projectId
    );
  }
}
