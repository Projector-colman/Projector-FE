import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { CommentsService } from 'src/app/services/comments.service';
import { UsersService } from 'src/app/services/users.service';

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
    private usersService: UsersService
  ) {
    this.newComment = false;
    this.closeNewCommentEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  getTime(): string {
    let dd = String(this.comment.time.getDate()).padStart(2, '0');
    let mm = String(this.comment.time.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.comment.time.getFullYear();
    let HH = this.comment.time.getHours();
    let MM =
      this.comment.time.getMinutes() < 10
        ? '0' + this.comment.time.getMinutes()
        : this.comment.time.getMinutes();
    let time: string = mm + '/' + dd + '/' + yyyy + ' ' + HH + ':' + MM;
    return time;
  }

  closeNewComment(): void {
    this.closeNewCommentEmitter.emit();
  }

  saveComment(): void {
    if (this.description) {
      this.comment.description = this.description;
      this.commentsService.saveComment(this.comment);
      this.closeNewComment();
    }
  }

  getWriterImg(): string {
    return this.usersService.getUser(this.comment.writer).image;
  }
}
