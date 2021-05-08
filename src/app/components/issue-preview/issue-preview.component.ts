import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-issue-preview',
  templateUrl: './issue-preview.component.html',
  styleUrls: ['./issue-preview.component.scss'],
})
export class IssuePreviewComponent implements OnInit {
  @Input() issue: Issue;
  constructor(private usersService: UsersService) {}

  ngOnInit(): void {}

  getUserImage(): string {
    return this.usersService
      .getUsers()
      .find((user: User) => this.issue.asignee === user.id).image;
  }
}
