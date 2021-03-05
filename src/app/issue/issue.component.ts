import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-issue',
  templateUrl: './issue.component.html',
  styleUrls: ['./issue.component.scss']
})
export class IssueComponent implements OnInit {
  @Input() id: string;
  @Input() desc: string;
  @Input() status: string;
  @Input() time: string;
  @Input() assignee: string;
  constructor() { }

  ngOnInit(): void {
  }

}
