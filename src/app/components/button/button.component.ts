import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Epic } from 'src/app/interfaces/epic';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() header?: string;
  @Output() buttonClickedEmitter: EventEmitter<void>;
  constructor() {
    this.buttonClickedEmitter = new EventEmitter<void>();
  }

  ngOnInit(): void {}

  buttonClicked() {
    this.buttonClickedEmitter.emit();
  }
}
