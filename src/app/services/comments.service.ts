import { HttpClient } from '@angular/common/http';
import { beAddress } from '../environment';
import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  comments: Comment[] = [];
  constructor(private http: HttpClient) {}

  getComments(): Observable<any> {
    return this.http.get(beAddress + `api/comments`);
  }

  saveComment(comment: Comment): Observable<any> {
    // this.comments.push(comment);
    return this.http.post(beAddress + 'api/comments', comment);
  }

  deleteComment(comment: Comment): Observable<any> {}
}
