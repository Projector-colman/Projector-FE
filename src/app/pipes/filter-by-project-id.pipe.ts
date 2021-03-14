import { Pipe, PipeTransform } from '@angular/core';
import { Comment } from '../interfaces/comment';

@Pipe({
  name: 'filterByProjectId',
  pure: false,
})
export class filterByProjectId implements PipeTransform {
  transform(currProjectComments: Comment[], projectId: string): Comment[] {
    return currProjectComments.filter(
      (comment: Comment) => comment.projectId === projectId
    );
  }
}
