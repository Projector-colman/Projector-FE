import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'projector-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  stuff() {
    console.log('clicked')
  }
}
