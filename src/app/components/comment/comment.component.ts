import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { User } from 'src/app/interfaces/user';
import { CommentsService } from 'src/app/services/comments.service';
import { IssuesService } from 'src/app/services/issues.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() newComment: boolean;
  @Output() closeNewCommentEmitter: EventEmitter<boolean>;
  description: string;
  constructor(
    private commentsService: CommentsService,
    private usersService: UsersService,
    private issuesService: IssuesService
  ) {
    this.newComment = false;
    this.closeNewCommentEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  getTime(): string {
    const time: string = this.comment.createdAt;
    // if (time)
    //   let dd = String(this.comment.createdAt.getDate()).padStart(2, '0');
    // let mm = String(this.comment.createdAt.getMonth() + 1).padStart(2, '0'); //January is 0!
    // let yyyy = this.comment.createdAt.getFullYear();
    // let HH = this.comment.createdAt.getHours();
    // let MM =
    //   this.comment.createdAt.getMinutes() < 10
    //     ? '0' + this.comment.createdAt.getMinutes()
    //     : this.comment.createdAt.getMinutes();
    // let time: string = mm + '/' + dd + '/' + yyyy + ' ' + HH + ':' + MM;
    return time;
  }

  closeNewComment(): void {
    this.closeNewCommentEmitter.emit();
  }

  saveComment(): void {
    if (this.description) {
      this.comment.description = this.description;
      console.log(this.comment);
      this.commentsService.saveComment(this.comment).subscribe(
        (res) => {
          Swal.fire({
            icon: 'success',
            title: 'The comment has been saved',
          });
        },
        (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to save comment!',
          });
        }
      );
      this.closeNewComment();
    }
  }

  getWriterImg() {
    this.usersService.getCurrConnectedUser().subscribe((user: User) => {
      return user?.image;
    });
  }
}
