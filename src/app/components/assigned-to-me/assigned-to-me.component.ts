import { Component, Input, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage.service';
import { Issue } from '../../interfaces/issue';

@Component({
  selector: 'app-assigned-to-me',
  templateUrl: './assigned-to-me.component.html',
  styleUrls: ['./assigned-to-me.component.scss']
})
export class AssignedToMeComponent implements OnInit {
  @Input() assignedIssues: Issue[];
  constructor() { }

  ngOnInit(): void {
  }

}
