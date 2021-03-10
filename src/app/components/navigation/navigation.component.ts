import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { CreateProjectComponent } from '../modals/create-project/create-project.component';
import { CreateIssueComponent } from '../modals/create-issue/create-issue.component';

@Component({
  selector: 'projector-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor(private dialog: MatDialog, private userService: UsersService) {}

  ngOnInit(): void {}

  getCurrUser(): User {
    return this.userService.getCurrConnectedUser();
  }
  createProject() {
    const issueDialogRef = this.dialog.open(CreateProjectComponent, {
      width: '65vh',
      height: '75vh',
    });}
  createIssue() {
    const issueDialogRef = this.dialog.open(CreateIssueComponent, {
      width: '65vh',
      height: '75vh',
    });
  }
}
