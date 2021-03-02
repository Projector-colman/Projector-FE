import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CreateIssueComponent } from '../modals/create-issue/create-issue.component';

@Component({
  selector: 'projector-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.createIssue();
  }

  createIssue() {
    const issueDialogRef = this.dialog.open(CreateIssueComponent, {
      width: '65vh',
      height: '75vh'
    });
  }
}
