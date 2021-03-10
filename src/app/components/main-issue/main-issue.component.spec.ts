import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIssueComponent } from './main-issue.component';

describe('MainIssueComponent', () => {
  let component: MainIssueComponent;
  let fixture: ComponentFixture<MainIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
