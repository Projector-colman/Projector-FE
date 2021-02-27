import { TestBed } from '@angular/core/testing';

import { SidenavUpdateService } from './sidenav-update.service';

describe('SidenavUpdateService', () => {
  let service: SidenavUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SidenavUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
