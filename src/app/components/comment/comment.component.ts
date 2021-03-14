import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/interfaces/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input() comment: Comment;
  @Input() newComment: boolean;
  constructor() {
    this.newComment = false;
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
}
