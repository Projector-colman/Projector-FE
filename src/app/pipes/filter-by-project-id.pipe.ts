import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../interfaces/comment';

@Pipe({
  name: 'filterByIssueId',
  pure: false,
})
export class filterByIssueId implements PipeTransform {
  transform(comments: Comment[], issueId: number): Comment[] {
    return comments.filter((comment: Comment) => comment.issue === issueId);
  }
}
