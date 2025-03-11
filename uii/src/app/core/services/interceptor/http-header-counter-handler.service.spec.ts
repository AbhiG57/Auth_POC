import { TestBed } from '@angular/core/testing';

import { HttpHeaderCounterHandlerService } from './http-header-counter-handler.service';

describe('HttpHeaderCounterHandlerService', () => {
  let service: HttpHeaderCounterHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpHeaderCounterHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
