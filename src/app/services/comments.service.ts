import { HttpClient, HttpParams } from '@angular/common/http';
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

  getComments(filters): Observable<any> {
    let params = new HttpParams();
    const keys = Object.keys(filters);

    keys.forEach((key) => {
      params = params.append(key, filters[key]);
    });

    return this.http.get(beAddress + `api/comments`, { params: params });
  }

  saveComment(comment: Comment): Observable<any> {
    // this.comments.push(comment);
    return this.http.post(beAddress + 'api/comments', comment);
  }

  deleteComment(comment: Comment): void {}
}
