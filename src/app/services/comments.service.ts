import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/comment';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: Comment[] = [];
  constructor() {}

  saveComment(comment: Comment): void {
    this.comments.push(comment);
  }
}
