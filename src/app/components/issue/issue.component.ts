import { Comment } from 'src/app/interfaces/comment';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IssueLocation } from 'src/app/enum/issueLocation.enum';
import { IssueStatus } from 'src/app/enum/issueStatus.enum';
import { Issue } from 'src/app/interfaces/issue';
import { CommentsService } from 'src/app/services/comments.service';
import { AuthService } from '../../services/auth.service';
import { IssuesService } from 'src/app/services/issues.service';
import { Epic } from 'src/app/interfaces/epic';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit, OnChanges {
  @Input() issue: Issue;
  @Input() projectKey: string;
  epic: Observable<Epic>;
  @Output() closeIssueEmitter: EventEmitter<void>;
  
  editDesc = false;
  editStat = false;
  newStatus;

  addNewComment: boolean;
  comments: Comment[];

  constructor(
    public commentsService: CommentsService,
    private authService: AuthService,
    private issuesService: IssuesService
  ) {
    this.addNewComment = false;
    this.closeIssueEmitter = new EventEmitter<void>();
    this.epic = new Observable<Epic>();
  }

  ngOnInit(): void {
    this.refreshComments();

    this.epic = Observable.create((observer) => {
      this.issuesService
        .getEpics({ id: this.issue.epic })
        .subscribe((epic: Epic) => {
          observer.next(epic[0]);
        });
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}

  public get issuesLocation(): typeof IssueLocation {
    return IssueLocation;
  }

  public get issuesStatus(): string {
    switch (this.issue.status) {
      case IssueStatus.ToDo: {
        return 'To Do';
      }
      case IssueStatus.InProgress: {
        return 'In Progress';
      }
      case IssueStatus.Verify: {
        return 'Verify';
      }
      case IssueStatus.Done: {
        return 'Done';
      }
      case IssueStatus.None: {
        switch (this.issue.sprintStatus) {
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

  editDescription(newDescription) {
    this.editDesc = !this.editDesc;
    this.issue.description = newDescription
    this.issuesService.updateIssue(this.issue).subscribe(res => {
      console.log('updated');
    }, err => {
      console.error(err)
    })
  }

  editStatus() {
    this.editStat = !this.editStat;
    this.issue.status = this.newStatus;
    this.issuesService.updateIssue(this.issue).subscribe(res => {
      console.log('updated');
    }, err => {
      console.error(err)
    })
  }

  changeNewStatus(e) {
    this.newStatus = e.target.value.substring(
      e.target.value.indexOf(' ') + 1
    );
  }

  addComment(): Comment {
    let newComment: Comment = {
      description: '',
      issue: this.issue.id,
    };
    this.addNewComment = true;
    return newComment;
  }

  cancleNewComment(isRefresh: boolean): void {
    this.addNewComment = false;
    if (isRefresh) {
      this.refreshComments();
    }
  }

  closeIssue(): void {
    this.closeIssueEmitter.emit();
  }

  refreshComments(): void {
    this.commentsService.getComments({issue: this.issue.id}).subscribe((comments) => {
      this.comments = comments;
    });
  }
}
