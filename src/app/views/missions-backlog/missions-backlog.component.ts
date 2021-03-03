import { Component, Input, OnInit } from '@angular/core';
import { Mission } from 'src/app/interfaces/mission';

@Component({
  selector: 'app-missions-backlog',
  templateUrl: './missions-backlog.component.html',
  styleUrls: ['./missions-backlog.component.scss'],
})
export class MissionsBacklogComponent implements OnInit {
  @Input() header: string;
  @Input() missions: Mission[];
  constructor() {}

  ngOnInit(): void {}
}
