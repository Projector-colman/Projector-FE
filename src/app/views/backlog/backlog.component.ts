import { Component, OnInit } from '@angular/core';
import { SidenavUpdateService } from 'src/app/services/sidenav-update.service';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {

  constructor(private sidenavUpdateService: SidenavUpdateService) { }

  ngOnInit(): void {
    this.sidenavUpdateService.changeMessage("backlog");
  }

}
