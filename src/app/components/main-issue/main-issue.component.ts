import { Component,Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-issue',
  templateUrl: './main-issue.component.html',
  styleUrls: ['./main-issue.component.scss']
})
export class MainIssueComponent implements OnInit {
  @Input() id: string;
  @Input() desc: string;
  @Input() status: string;
  @Input() time: string;
  @Input() assignee: string;
  @Input() projectKey: string | 'prj';
  @Input() name: string;
  constructor() { }

  ngOnInit(): void {
  }
}