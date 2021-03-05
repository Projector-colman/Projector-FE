import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIssueComponent } from './create-issue.component';

describe('CreateIssueComponent', () => {
  let component: CreateIssueComponent;
  let fixture: ComponentFixture<CreateIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIssueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
