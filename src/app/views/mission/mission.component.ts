import { Component, Input, OnInit } from '@angular/core';
import { Mission } from 'src/app/interfaces/mission';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
  @Input() mission: Mission;
  currUser: User;
  constructor(private userService: UsersService) {}

  ngOnInit(): void {
    this.currUser = this.userService.getCurrConnectedUser();
  }
}
