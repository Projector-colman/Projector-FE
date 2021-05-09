import { CdkDrag, CdkDragDrop } from '@angular/cdk/drag-drop';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';

@Component({
  selector: 'app-issues-backlog',
  templateUrl: './issues-backlog.component.html',
  styleUrls: ['./issues-backlog.component.scss'],
})
export class IssuesBacklogComponent implements OnChanges {
  @Input() header: string;
  @Input() issues: Issue[];
  @Input() showPlanSprintBtn: boolean;
  @Output() openIssueEmitter: EventEmitter<Issue>;
  constructor() {
    this.showPlanSprintBtn = false;
    this.openIssueEmitter = new EventEmitter<Issue>();
  }

  ngOnChanges(changes: SimpleChanges) {}

  openIssue(issue: Issue): void {
    this.openIssueEmitter.emit(issue);
  }
}
