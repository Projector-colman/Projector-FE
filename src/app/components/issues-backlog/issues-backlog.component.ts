import { MatDialog } from '@angular/material/dialog';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { PlanSprintComponent } from '../plan-sprint/plan-sprint.component';
import { ProjectsService } from 'src/app/services/projects.service';

@Component({
  selector: 'app-issues-backlog',
  templateUrl: './issues-backlog.component.html',
  styleUrls: ['./issues-backlog.component.scss'],
})
export class IssuesBacklogComponent implements OnChanges {
  @Input() header: string;
  @Input() issues;
  @Input() showPlanSprintBtn: boolean;
  @Input() projectId: string;
  @Output() openIssueEmitter: EventEmitter<Issue>;
  
  constructor(private dialog: MatDialog) {
    this.showPlanSprintBtn = false;
    this.openIssueEmitter = new EventEmitter<Issue>();
  }

  ngOnChanges(changes: SimpleChanges) {}

  openIssue(issue: Issue): void {
    this.openIssueEmitter.emit(issue);
  }

  planSprint() {
    const planSprintDialogRef = this.dialog.open(PlanSprintComponent, {
      width: '90vh',
      height: '65vh',
      panelClass: 'planSprintDialogRef',
      data: this.projectId,
    });
  }
}
