import { Component, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { CreateProjectComponent } from '../modals/create-project/create-project.component';
import { CreateIssueComponent } from '../modals/create-issue/create-issue.component';
import { AuthService } from '../../services/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'projector-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  myUser: User;
  imageurl;

  constructor(private dialog: MatDialog, 
              private userService: UsersService,
              public authService: AuthService,
              private domSanitizer: DomSanitizer,) {}

  ngOnInit(): void {
    this.userService.getCurrConnectedUser().subscribe(user => {
      if(user) {
        this.myUser = user;
        let TYPED_ARRAY = new Uint8Array(this.myUser.image.data);
        const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
        this.imageurl = this.domSanitizer.bypassSecurityTrustResourceUrl(STRING_CHAR);
      }
    });
  }

  createProject() {
    const issueDialogRef = this.dialog.open(CreateProjectComponent, {
      width: '65vh',
      height: '75vh',
    });
  }
  
  createIssue() {
    const issueDialogRef = this.dialog.open(CreateIssueComponent, {
      width: '65vh',
      height: '75vh',
    });
  }
}
