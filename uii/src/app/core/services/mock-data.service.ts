import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MockDataService {
  constructor(private apiService: ApiService) { }
  
  getChatHistoryTitles():Observable<any>
  {
    return this.apiService.get('');
  }
  getChatHistoryDetails():Observable<any>
  {
    return this.apiService.get('');
  }
  getLLMList():Observable<any>
  {
    return this.apiService.get('');
  }
  getResturantsData():Observable<any>
  {
    return this.apiService.get('');
  }
  getDummyData():Observable<any>
  {
    return this.apiService.get('');
  }
  
} 


