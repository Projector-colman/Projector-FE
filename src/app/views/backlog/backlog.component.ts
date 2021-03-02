import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  constructor(public router: Router, private sidenavUpdateService: SidenavUpdateService) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage("backlog");
    this.sidenavUpdateService.changeProject(this.router.url.split('/')[2]);
  }

}
