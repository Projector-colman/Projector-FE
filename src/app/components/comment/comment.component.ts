import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private router: Router
  ) {
    this.newComment = false;
    this.closeNewCommentEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  closeNewComment(isSaved: boolean): void {
    this.closeNewCommentEmitter.emit(isSaved);
  }

  saveComment(): void {
    if (this.description) {
      this.comment.description = this.description;
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
      this.closeNewComment(true);
    }
  }

  getWriterImg() {
    this.usersService.getCurrConnectedUser().subscribe((user: User) => {
      return user?.image;
    });
  }

  // deleteComment() {
  //   this.commentsService.
  // }
}
