import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {User} from '../../../interfaces/user';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss']
})
export class UserSettingsComponent implements OnInit {
  @Input() userDetails: User;
  userEditForm: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.userDetails = {
      fullName: 'ITAMAR MAROM',
      imageSrc: 'https://www.theglobeandmail.com/resizer/a1tsouRgbsPGVK8OvdFYJqxNhEo=/4415x0/filters:quality(80)/arc-anglerfish-tgam-prod-tgam.s3.amazonaws.com/public/5HSZVXDII5BRRHH4S6KE4WZ7RE.jpg',
      userName: 'Best-user',
      email: 'itsamail@gmail.com',
      password: 'Aa123456',
      userProjects: [{
        projectName: 'PROJECTOR(PRJ)',
        projectIcon: 'fas fa-projector',
        color: '#eb4034'
      }, {
        projectName: 'PROJECTOR-A',
        projectIcon: 'fas fa-projector',
        color: '#a2d1f2'
      }]
    };
    this.userEditForm = new FormGroup({
      userName: new FormControl(this.userDetails.userName, Validators.required),

    });
  }

}
