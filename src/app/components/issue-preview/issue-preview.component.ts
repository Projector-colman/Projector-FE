import { Component, Input, OnInit } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { User } from 'src/app/interfaces/user';
import { UsersService } from 'src/app/services/users.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-issue-preview',
  templateUrl: './issue-preview.component.html',
  styleUrls: ['./issue-preview.component.scss'],
})
export class IssuePreviewComponent implements OnInit {
  @Input() issue: Issue;

  imageurl;
  constructor(private usersService: UsersService,
    private domSanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if(this.issue.User.image) {
      let TYPED_ARRAY = new Uint8Array(this.issue.User.image.data);
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      this.imageurl = this.domSanitizer.bypassSecurityTrustResourceUrl(STRING_CHAR);
    } else {
      this.imageurl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://material.angular.io/assets/img/examples/shiba1.jpg');
    }
  }
}
