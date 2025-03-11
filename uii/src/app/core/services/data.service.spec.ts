import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ApiService } from './api.service';

import { DataService } from './data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DataService', () => {
  let service: DataService;
  let mockApiService;
  beforeEach(() => {
    mockApiService = jasmine.createSpyObj(['post','get','put','delete']);
    mockApiService.post.and.returnValue(of(null));
    mockApiService.put.and.returnValue(of(null));
    mockApiService.get.and.returnValue(of([]));
    mockApiService.delete.and.returnValue(of(null));
    TestBed.configureTestingModule({
    imports: [],
    providers: [DataService, { provide: ApiService, useValue: mockApiService }, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
