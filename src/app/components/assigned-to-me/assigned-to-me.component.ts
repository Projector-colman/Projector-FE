import { Component, OnInit } from '@angular/core';
import { HomepageService } from 'src/app/services/homepage.service';
import { Issue } from '../../interfaces/issue';

@Component({
  selector: 'app-assigned-to-me',
  templateUrl: './assigned-to-me.component.html',
  styleUrls: ['./assigned-to-me.component.scss']
})
export class AssignedToMeComponent implements OnInit {
  assignedIssues: Issue[];
  constructor(private homepageService: HomepageService) { }

  ngOnInit(): void {
    this.homepageService.getCurrentUserAssignedIssues().subscribe((issues: Issue[]) => {
      this.assignedIssues = issues;
    })
    //this.assignedIssues = this.homepageService.getCurrentUserAssignedIssues();
  }

}
