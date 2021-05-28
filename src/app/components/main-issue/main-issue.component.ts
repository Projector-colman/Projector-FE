import { Component,Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Issue } from 'src/app/interfaces/issue';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-main-issue',
  templateUrl: './main-issue.component.html',
  styleUrls: ['./main-issue.component.scss']
})
export class MainIssueComponent implements OnInit {
  @Input() issue: Issue;
  @Input() projectKey: string | 'prj';
  @Output() issueToOpen = new EventEmitter<Issue>();

  imageurl
  constructor(private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    if(this.issue.User.image) {
      let TYPED_ARRAY = new Uint8Array(this.issue.User.image.data);
      const STRING_CHAR = String.fromCharCode.apply(null, TYPED_ARRAY);
      this.imageurl = this.domSanitizer.bypassSecurityTrustResourceUrl(STRING_CHAR);
    } else {
      this.imageurl = this.domSanitizer.bypassSecurityTrustResourceUrl('https://material.angular.io/assets/img/examples/shiba1.jpg');
    }

  }
  clicked() {
    this.issueToOpen.emit(this.issue);
  }
}