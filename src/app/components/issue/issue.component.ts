import { Comment } from 'src/app/interfaces/comment';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IssueLocation } from 'src/app/enum/issueLocation.enum';
import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { Issue } from 'src/app/interfaces/issue';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue;
  @Output() closeIssueEmitter: EventEmitter<void>;
  addNewComment: boolean;
  comments: Comment[];
  constructor(
    public commentsService: CommentsService,
    private userService: UsersService
  ) {
    this.addNewComment = false;
    this.closeIssueEmitter = new EventEmitter<void>();
  }

  ngOnInit(): void {
    this.comments = this.commentsService.comments;
  }

  public get issuesLocation(): typeof IssueLocation {
    return IssueLocation;
  }

  public get issuesStatus(): string {
    let status: string = 'To wDo';
    switch (this.issue.status) {
      case IssueStatus.ToDo: {
        return 'To Do';
      }
      case IssueStatus.InProgress: {
        return 'In Progress';
      }
      case IssueStatus.Stuck: {
        return 'Stuck';
      }
      case IssueStatus.Done: {
        return 'Done';
      }
      case IssueStatus.None: {
        switch (this.issue.sprint) {
          case IssueLocation.CurrentSprint: {
            return '';
          }
          case IssueLocation.PlannedSprint: {
            return 'In Planned Sprint';
          }
          case IssueLocation.Backlog: {
            return 'In Backlog';
          }
          default: {
            break;
          }
        }
      }
    }
  }

  addComment(): Comment {
    let newComment: Comment = {
      writer: this.userService.getCurrConnectedUser().id,
      time: new Date(),
      description: '',
      issue: this.issue.id,
    };
    this.addNewComment = true;
    return newComment;
  }

  cancleNewComment() {
    this.addNewComment = false;
  }

  closeIssue(): void {
    this.closeIssueEmitter.emit();
  }
}
