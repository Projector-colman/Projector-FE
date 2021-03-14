import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() newComment: boolean;
  @Output() closeNewCommentEmitter: EventEmitter<boolean>;
  content: string;
  constructor(private commentsService: CommentsService) {
    this.newComment = false;
    this.closeNewCommentEmitter = new EventEmitter<boolean>();
  }

  ngOnInit(): void {}

  getTime(): string {
    let dd = String(this.comment.date.getDate()).padStart(2, '0');
    let mm = String(this.comment.date.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = this.comment.date.getFullYear();
    let HH = this.comment.date.getHours();
    let MM =
      this.comment.date.getMinutes() < 10
        ? '0' + this.comment.date.getMinutes()
        : this.comment.date.getMinutes();
    let time: string = mm + '/' + dd + '/' + yyyy + ' ' + HH + ':' + MM;
    return time;
  }

  closeNewComment(): void {
    this.closeNewCommentEmitter.emit();
  }

  saveComment(): void {
    if (this.content) {
      this.comment.content = this.content;
      this.commentsService.saveComment(this.comment);
      this.closeNewComment();
    }
  }
}
