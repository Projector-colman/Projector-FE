import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss'],
})
export class IssueComponent implements OnInit {
  @Input() issue: Issue;
  currUser: User;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.currUser = this.userService.getCurrConnectedUser();
  }
}
